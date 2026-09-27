# Travel_setup

2027년 1월 삿포로·조잔케이 4박 5일 겨울 여행 플래너입니다.

- 주소: https://asdwqdwsd.github.io/Travel_setup/
- 여행 조건(인원·료칸·공항 교통·비행기 시간)을 넣고 가고 싶은 곳을 담으면 날짜별 동선, 지도, 비용, 예약할 것이 자동으로 짜입니다.
- 휴대폰에서 "홈 화면에 추가"를 해 두면 인터넷이 안 될 때도 시간표·지도·상세정보를 열 수 있습니다(`sw.js`). 구글 지도·공식 사이트 링크는 인터넷이 필요합니다.

## 파일

| 파일 | 내용 |
| --- | --- |
| `index.html` | 플래너 페이지 (지도 데이터·장소 정보 포함) |
| `leaflet.js`, `leaflet-LICENSE.txt` | 지도 라이브러리 Leaflet 1.9.4 (BSD-2-Clause) |
| `sw.js` | 오프라인용 서비스 워커 |
| `manifest.webmanifest`, `icon-*.png` | 홈 화면 추가용 앱 정보·아이콘 |

`index.html`은 직접 고치지 않고 생성합니다. 원본(장소 데이터, 동선 계산, 빌드 스크립트)은 `itdukku-shopping` 저장소의 `trip/sapporo-2027/build/`에 있고, `python3 build.py`를 실행하면 `trip/sapporo-2027/site/index.html`이 만들어집니다.

배경지도: 국토지리원 "지구지도 일본(Global Map Japan) v2.2" — 출처 표기 조건으로 이용.
