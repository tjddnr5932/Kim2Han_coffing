2021/11/09 로그인 및 회원가입과 마이페이지 중 맛선택을 구현하였다. dev파일에는 cofiInfor.js파일로 암호화와 DB정보 및 session에 seccret정보가 담겨있다.

2021/11/10 카카오맵 api를 통해서 좌표(위도, 경도)를 받아오거나 text창을 통해 주소를 입력을하면 서버에서 node-geocoder를 통해 'openstreetmap'을 이용해 카카오맵을 통해 좌표값을 받아오면 주소를 구하고 text창으로 주소를 받아오면 좌표를 구해 유저 데이터베이스에 저장한 후 마이페이지로 돌아가는 기능 구현

2021/11/11 자격증 사진을 업로드하여 서버에 있는 폴더에 저장하고 데이터베이스에는 폴더 경로를 저장하는 기능 구현(사진을 업로드를 이미 한 사용자는 insert하지 않고 update한다.)
