2021/11/09 로그인 및 회원가입과 마이페이지 중 맛선택을 구현하였다. dev파일에는 cofiInfor.js파일로 암호화와 DB정보 및 session에 seccret정보가 담겨있다.

2021/11/10 카카오맵 api를 통해서 좌표(위도, 경도)를 받아오거나 text창을 통해 주소를 입력을하면 서버에서 node-geocoder를 통해 'openstreetmap'을 이용해 카카오맵을 통해 좌표값을 받아오면 주소를 구하고 text창으로 주소를 받아오면 좌표를 구해 유저 데이터베이스에 저장한 후 마이페이지로 돌아가는 기능 구현

2021/11/11 자격증 사진을 업로드하여 서버에 있는 폴더에 저장하고 데이터베이스에는 폴더 경로를 저장하는 기능 구현(사진을 업로드를 이미 한 사용자는 insert하지 않고 update한다.)

2021/11/12 gps를 이용하여 지도에 현재 자신의 위치를 바로 띄워준다, 클릭시 마커에 마우스를 올리면 인포윈도우가 뜨고 마우스를 올리지 않으면 인포윈도우를 닫는 기능 구현

2021/11/15 로그인과 회원가입, 마이페이지 프론트/백 결합을 완료했습니다. 이에 따른 각종 버그 수정하였습니다.

2021/11/16 마이페이지 버그 수정 및 마이페이즈 자격증 등록 업그레이드, 추천 시 카페 방문하기 기능 추가

2021/11/17 추천시 클라이언트에게 보낼 카카오 map api 구성/view_cafe 기능 추가(추천맵에서 view_cafe 접근 시 추천맵으로 돌아가기 버튼 생성)/DB변경에 따른 코드 수정(taste_process에 유저 테이블에 추가로 데이터 업데이트)
           원두 아이템베이스 생성과 아이템베이스 안에서 설정된 맛과 매칭되는 원두를 찾아주는 함수를 dev에 생성/카카오맵에 추천된 카페를 띄울때 1순위와 2순위를 구분해줄 수 있도록 개선/마이페이지에 사용자가 설된원 원두를 보여줄 수 있게 UI업데이트

2021/11/19 locationSetting을 통해 유제 테이블에 distance 업로드 추가, 사용자 위치 표시 마커 이미지 변경, 맛선택, 리뷰쓰기페이지 프론트와 백 연결 및 버그 수정

2021/11/20 mypage프론트백 연결/mypage에 main페이지로 돌아가는 기능 추가/방문한 카페에서 리뷰를 쓴 카페는 자신이 쓴 리뷰를 볼 수 있게 업데이트

2021/11/21 list페이지 프론태 백 연결 및 그에 맞게 수정

2021/11/22 header의 make a coffing을 누를 시 main페이지로 이동추가/추천경로 비로그인시 로그인 안내 경로 추가/추천list페이지 오류 수정/mypage경로에 있던 list경로를 recommendRouter로 이동