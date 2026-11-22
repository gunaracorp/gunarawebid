#!/bin/bash
# E2E Fase 2 — Editor Ultra: autosave dedup revisi, publish, render rich text.
# Kunci internal dibaca dari .env dan TIDAK PERNAH dicetak.
set -u
cd /home/z/my-project

BASE="http://localhost:3000"
JAR="/tmp/fase2-cookies.txt"
KEY=$(grep '^INTERNAL_ACCESS_KEY=' .env.local 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")
[ -z "$KEY" ] && KEY=$(grep '^INTERNAL_ACCESS_KEY=' .env 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")

lulus=0; gagal=0
cek() { # $1 nama, $2 kondisi (0/1)
  if [ "$2" -eq 1 ]; then lulus=$((lulus+1)); echo "  OK  $1";
  else gagal=$((gagal+1)); echo "  GAGAL $1"; fi
}

echo "== 1. Guard tanpa sesi ditolak =="
KODE=$(curl -s -o /dev/null -w "%{http_code}" "$BASE/api/internal/cms/posts")
cek "API tanpa cookie → 401/307 (dapat $KODE)" $([ "$KODE" = "401" ] || [ "$KODE" = "307" ] && echo 1 || echo 0)

echo "== 2. Login internal =="
LOGIN=$(curl -s -c "$JAR" -X POST "$BASE/api/internal/auth" -H 'Content-Type: application/json' -d "{\"key\":\"$KEY\"}")
cek "login ok" $(echo "$LOGIN" | grep -q '"ok":true' && echo 1 || echo 0)

echo "== 3. Buat artikel uji =="
CREATE=$(curl -s -b "$JAR" -X POST "$BASE/api/internal/cms/posts" -H 'Content-Type: application/json' -d '{"title":"Uji Fase 2 — Editor Ultra","subtitle":"Verifikasi autosave & rich text"}')
PID=$(echo "$CREATE" | python3 -c "import sys,json;print(json.load(sys.stdin)['post']['id'])")
SLUG=$(echo "$CREATE" | python3 -c "import sys,json;print(json.load(sys.stdin)['post']['slug'])")
cek "artikel dibuat id=$PID slug=$SLUG" $([ -n "$PID" ] && echo 1 || echo 0)

BLOK1='[{"type":"paragraph","text":"Metodologi **UMEA** dan *G-DOS* serta ==sorot== plus `kode` dan [tautan](/ekosistem)."},{"type":"heading","text":"**Bagian** Uji","level":2}]'
BLOK2='[{"type":"paragraph","text":"Autosave **kedua** — masih dalam 5 menit."}]'
BLOK3='[{"type":"paragraph","text":"Simpanan manual **ketiga** — snapshot wajib tercipta."}]'

echo "== 4. Autosave #1 (auto=true) =="
A1=$(curl -s -b "$JAR" -X PATCH "$BASE/api/internal/cms/posts/$PID" -H 'Content-Type: application/json' -d "{\"blocks\":$BLOK1,\"auto\":true}")
cek "autosave #1 ok" $(echo "$A1" | grep -q '"ok":true' && echo 1 || echo 0)

echo "== 5. Autosave #2 dalam 5 menit — revisi TIDAK bertambah =="
A2=$(curl -s -b "$JAR" -X PATCH "$BASE/api/internal/cms/posts/$PID" -H 'Content-Type: application/json' -d "{\"blocks\":$BLOK2,\"auto\":true}")
REV=$(curl -s -b "$JAR" "$BASE/api/internal/cms/posts/$PID/revisions")
NREV=$(echo "$REV" | python3 -c "import sys,json;print(len(json.load(sys.stdin)['revisions']))")
cek "revisi tetap 1 (dedup autosave) — dapat $NREV" $([ "$NREV" = "1" ] && echo 1 || echo 0)

echo "== 6. Simpan manual — snapshot selalu tercipta =="
A3=$(curl -s -b "$JAR" -X PATCH "$BASE/api/internal/cms/posts/$PID" -H 'Content-Type: application/json' -d "{\"blocks\":$BLOK3}")
REV2=$(curl -s -b "$JAR" "$BASE/api/internal/cms/posts/$PID/revisions")
NREV2=$(echo "$REV2" | python3 -c "import sys,json;print(len(json.load(sys.stdin)['revisions']))")
NOTE=$(echo "$REV2" | python3 -c "import sys,json;print(json.load(sys.stdin)['revisions'][0]['note'])")
cek "revisi jadi 2 — dapat $NREV2" $([ "$NREV2" = "2" ] && echo 1 || echo 0)
cek "note terbaru = 'Sebelum penyimpanan terbaru' — dapat '$NOTE'" $([ "$NOTE" = "Sebelum penyimpanan terbaru" ] && echo 1 || echo 0)

echo "== 6b. Konten final kembali ke BLOK1 (kaya format) via simpan manual =="
A4=$(curl -s -b "$JAR" -X PATCH "$BASE/api/internal/cms/posts/$PID" -H 'Content-Type: application/json' -d "{\"blocks\":$BLOK1}")
cek "patch final ok" $(echo "$A4" | grep -q '"ok":true' && echo 1 || echo 0)

echo "== 7. Publikasikan =="
PUB=$(curl -s -b "$JAR" -X POST "$BASE/api/internal/cms/posts/$PID/publish" -H 'Content-Type: application/json' -d '{"action":"publish"}')
cek "publish ok" $(echo "$PUB" | grep -q '"ok":true' && echo 1 || echo 0)

echo "== 8. Blog publik merender rich text =="
HTML=$(curl -s "$BASE/blog/$SLUG")
STRONG=$(echo "$HTML" | grep -c '<strong')
LINK=$(echo "$HTML" | grep -c 'href="/ekosistem"')
MARK=$(echo "$HTML" | grep -c '<mark')
CODE=$(echo "$HTML" | grep -c '<code')
DEL=$(echo "$HTML" | grep -c '<del')
ANCHOR=$(echo "$HTML" | grep -c 'id="bagian-uji"')
# Token mentah diperiksa pada konten TERLIHAT (tanpa <script> payload RSC Next.js).
TOKEN=$(echo "$HTML" | python3 -c "import sys,re;h=sys.stdin.read();h=re.sub(r'<script.*?</script>','',h,flags=re.S);print(len(re.findall(r'\*\*',h)))")
cek "bold ter-render ($STRONG)" $([ "$STRONG" -ge 1 ] && echo 1 || echo 0)
cek "tautan internal ter-render ($LINK)" $([ "$LINK" -ge 1 ] && echo 1 || echo 0)
cek "sorot ter-render ($MARK)" $([ "$MARK" -ge 1 ] && echo 1 || echo 0)
cek "kode inline ter-render ($CODE)" $([ "$CODE" -ge 1 ] && echo 1 || echo 0)
cek "italic ter-render" $(echo "$HTML" | grep -q '<em' && echo 1 || echo 0)
cek "TOC anchor bersih id=bagian-uji ($ANCHOR)" $([ "$ANCHOR" -ge 1 ] && echo 1 || echo 0)
if [ "$TOKEN" != "0" ]; then
  echo "  DEBUG — konteks token mentah:**"
  echo "$HTML" | grep -o '.\{60\}\*\*.\{60\}' | head -4
fi
cek "tanpa token mentah ** di HTML ($TOKEN)" $([ "$TOKEN" = "0" ] && echo 1 || echo 0)

echo "== 9. Feed & API headless tetap sehat =="
FEED=$(curl -s "$BASE/feed.xml" | grep -c "$SLUG")
cek "artikel masuk RSS feed ($FEED)" $([ "$FEED" -ge 1 ] && echo 1 || echo 0)

echo "== 10. Bersih-bersih =="
DELX=$(curl -s -b "$JAR" -X DELETE "$BASE/api/internal/cms/posts/$PID")
cek "artikel uji dihapus" $(echo "$DELX" | grep -q '"ok":true' && echo 1 || echo 0)
rm -f "$JAR"

echo ""
echo "HASIL E2E: $lulus lulus, $gagal gagal"
[ "$gagal" -eq 0 ] || exit 1
