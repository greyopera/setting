# 과제명 - 신용카드 결제 페이지

## 개요 
- 신용카드 정보 입력이 가능한 결제 frontend web 제작
- 신용카드 결제 API는 https://api.iamport.kr/ 참고 
    * REST API KEY: 6626876387746060
    * REST API SECRET KEY: qqNhlQRWu9yiSdDIWo9ApOCelxh9SNAidozzfrwJA42tiFbe3lPs9sHuZZERMea0DKASb6CMbEftjqHn
    * merchant_uid: imp85908354
    * 결제시 사용 API는 POST /subscribe/payments/onetime를 사용
    * 기타 API 사용은 문서를 참고
    * 추가 문서 (https://github.com/iamport/iamport-manual)
- 반응형 웹으로 페이지 제작
- JS MVC framework 사용 가능 
- 관련하여 여러 오픈 소스 활용 가능

## 요구사항
- 상품 선택 페이지, 신용카드 정보 입력 페이지, 결제 결과 페이지, 환불 페이지로 구성하도록 함
- 상품 선택 페이지에서 상품과 가격 정보는 [{ 'product': 'basic', 'price': 9900 }, { 'product': 'standard', 'price': 29900 }, { 'product': 'premium', 'price': 49900 }] 로 선택할 수 있어야 함
- 신용카드 정보 입력 페이지에서 이름, 이메일, 연락처를 필수로 입력 받아 결제시 정보에 같이 저장될 수 있도록 함
- 신용카드 정보는 카드번호/유효기간/생년월일(사업자등록번호)/비밀번호 앞 2자리이며, 사용자 입력 값은 보안상 입력 후 화면에서 가려져야 하며, 필수 입력이어야 함
- 결제 결과 페이지에서는 성공/실패와 관계없이 이름, 이메일, 연락처가 결과 화면에 보여주며, 성공시에는 선택한 상품, 가격, 입력한 카드의 9 ~ 12 자리를 보여주도록 함
- 결제 성공시에는 신용카드 결제 API에서 제공하는 이메일과 관계없이 결제 관련 이메일 전송 기능이 제공되어야 함.
    * EmailJS 에서 제공하는 라이브러리를 사용하도록 함 (https://www.emailjs.com/docs/)
        - user ID: user_4oInOnrK4Q6NPPLaqTf2x
        - access token: 5ee6c8eb3fc270264d883a46ec2cabe5
        - service ID: amazon_ses
        - template ID: template_XKuuphAF
        - i.e., emailjs.send("amazon_ses", "template_XKuuphAF", {"reply_to":"straightfor@classting.com","from_name":"classting","to_name":"user","message_html":"결제되었습니다"});

- 또한, 결제 성공시 환불 페이지로 이동이 가능해야 하며, 환불할 수 있어야 함
- 데스크탑 브라우저 뿐만 아니라 다양한 스마트폰 브라우저에서도 동작에 문제 없도록 함

### 참고사항
- 테스트모드로 결제되며, 결제금액은 당일 자정에 자동 취소됨

### 제출방법
- github public repository에 소스를 등록할 것
테스트할 수 있는 url 제공할 것