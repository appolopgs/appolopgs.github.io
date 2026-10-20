# appolopgs — Developer Portfolio

NMS, IoT, 감시·제어 분야를 위한 한국어 개발자 포트폴리오입니다.
파스텔 세이지 배경과 아이보리 카드에 딥 틸 포인트를 사용했습니다. 관제 데모는 네이비 패널과 청록색 연결 표시를 유지합니다.

## GitHub Pages 배포

1. GitHub에서 `appolopgs.github.io` 공개 저장소를 만듭니다. 이미 있다면 해당 저장소를 사용하세요.
2. 이 폴더의 파일과 `.github/workflows/pages.yml`, `.nojekyll`을 저장소의 `main` 브랜치에 올립니다.
3. 저장소 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 선택합니다.
4. **Actions → Deploy portfolio to GitHub Pages → Run workflow**를 실행하거나 `main`에 push합니다.
5. 배포가 성공하면 `https://appolopgs.github.io/`에서 확인합니다.

다른 이름의 저장소에 배포하면 `https://appolopgs.github.io/저장소이름/` 경로로 서비스됩니다. 모든 자산 경로는 상대 경로로 구성했습니다.
배포 주소: https://appolopgs.github.io/
저장소: https://github.com/appolopgs/appolopgs.github.io

## 내용 수정

- `index.html`: 소개, 분야별 설명, 연락처, 메타 정보.
- `style.css`: 색상, 레이아웃, 반응형 스타일.
- `config.js`: GitHub 사용자 이름과 표시할 저장소 수.
- `app.js`: GitHub 공개 저장소 조회와 필터. 인증 토큰은 사용하지 않습니다.

다른 사용자로 변경할 때는 config.js와 index.html에 있는 이름, 프로필 링크, 메타 정보도 함께 바꾸세요.
관제 그래픽은 DEMO / SIMULATED로 표시한 디자인 예시이며 실제 장비 상태나 경력 지표가 아닙니다.
저장소 정보는 방문자의 브라우저에서 GitHub API로 조회합니다. 비공개 저장소는 표시하지 않으며 API 제한·오프라인 상황에서는 GitHub 직접 링크를 제공합니다.
소개 문장은 사용자가 제공한 개발 분야를 바탕으로 작성한 초안이므로 공개 전 검토하세요.

## 로컬 확인

별도 빌드나 npm 설치 없이 index.html을 열 수 있습니다. HTTP 서버로 확인하려면 Python이 설치된 환경에서 아래 명령을 실행합니다.

```sh
python -m http.server 4173
```

이후 `http://localhost:4173`을 엽니다.
