# 라우터 정보


- 보호소 정보 크롤링  
	@app.route('/crawl')

- 보호소 정보 조회  
	@app.route('/shelter_info/<pageNo>')
  
  

- 시도 코드 정보 조회  
	@app.route('/get_sido_code')

- 시군구 코드 정보 조회  
	@app.route('/get_sigungu_code/<sido>')

  
  
- 유기동물 정보조회  
	@app.route('/shelter/animal/<pageNo>')

- 시도별 유기동물 정보 조회  
	@app.route('/shelter/animal/<sido>/<pageNo>')

- 시군구별 유기동물 정보 조회  
	@app.route('/shelter/animal/<sido>/<sigungu>/<pageNo>')

  
  
- 실종동물 찾기 (임시보호/목격 제보 게시글 목록 조회)  
	@app.route('/disc_resc/all')  
	@app.route('/disc_resc/<pageNo>')

- 실종신고 게시글 목록 조회  
	@app.route('/mis/all')  
	@app.route('/mis/<pageNo>')

- 게시글 상세 조회  
	@app.route('/detail/<postType>/<postID>')
  
  

- 게시글 작성  
	@app.route('/postok', methods=['POST'])

- 게시글 삭제  
	@app.route('/post_delete/<postType>/<postID>', methods=['DELETE'])

- 게시글 수정  
	@app.route('/post_update/<postID>', methods=['PUT'])

  
  
- 로컬 이미지 서버 전달  
	@app.route('/img/<imgName>')
