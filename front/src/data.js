import CheckBox from "./components/CheckBox";

export const sliderItems = [
  {
    id: 1,
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQReHEWHxbOLN5WTgkjG4lX3euK-IfjPlpww&usqp=CAU",
    // title: "중고거래 에티켓",
    // desc: "학생여러분 기본적인 매너를 지켜주세요",
    // bg: "dfe54e",
  },
  {
    id: 2,
    img: "https://img2.joongna.com/media/original/2023/01/31/1675156866566.png",
    // title: "AUTUMN COLLECTION",
    // desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
    // bg: "9a8e8e",
  },
  {
    id: 3,
    img:
      "https://openads-real.s3.amazonaws.com/openadsAdmin/images/contsThumb/contsThumb_1021143730450_%EC%A4%91%EA%B3%A0%EA%B1%B0%EB%9E%98%20%EC%8B%9C%EC%9E%A5,%20%EB%B9%84%EC%A3%BC%EB%A5%98%EB%9D%BC%EB%8A%94%20%EC%84%A4%EC%9B%80%20%ED%84%B8%EA%B3%A0%20%EC%A3%BC%EB%A5%98%EB%A1%9C%20%EB%B6%80%EC%83%81.png",
    // title: "당신의 근처",
    // desc: "전공책 가격 너무 비싸지 않나요? 저희 마켓을 이용해 보세요",
    // bg: "fbf0f4",
  },
];

export const categories = [
  {
    id: 1,
    img: "https://img.icons8.com/officel/16/null/nurse-female.png",
    title: "간호학과",
    cat: "간호학과",
  },
  {
    id: 2,
    img: "https://img.icons8.com/dusk/64/null/google-code.png",
    title: "컴퓨터과",
    cat: "컴퓨터과",
  },

  {
    id: 3,
    img: "https://img.icons8.com/color/48/null/pet.png",
    title: "펫케어과",
    cat: "펫케어과",
  },
  {
    id: 4,
    img: "https://img.icons8.com/fluency/48/null/electricity-hazard.png",
    title: "전기과",
    cat: "전기과",
  },
  {
    id: 5,
    img: "https://img.icons8.com/fluency/48/null/soldier-man.png",
    title: "부사관과",
    cat: "부사관과",
  },
  {
    id: 6,
    img: "https://img.icons8.com/dusk/64/null/babys-room.png",
    title: "유아교육과",
    cat: "유아교육과",
  },
  {
    id: 7,
    img: "https://img.icons8.com/stickers/100/null/illustrator.png",
    title: "디자인과",
    cat: "디자인과",
  },
  {
    id: 8,
    img: "https://img.icons8.com/clouds/100/null/robot.png",
    title: "기계과",
    cat: "기계과",
  },
];

export const popularProducts = [
  {
    id: 1,
    img:
      "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png",
  },
  {
    id: 2,
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9HlWz7WjTNW3noO_xOgUFO4vRLVAYKFfXg&usqp=CAU",
  },
  {
    id: 3,
    img:
      "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
  },
  {
    id: 4,
    img:
      "https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png",
  },
  {
    id: 5,
    img:
      "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
  },
  {
    id: 6,
    img:
      "https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png",
  },
  {
    id: 7,
    img:
      "https://www.vintageindustries.nl/download_front/qympzk1762/2217_Arrow_Jacket_Forest.png",
  },
  {
    id: 8,
    img:
      "https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png",
  },
];

export const basicSteps = [
  {
    id: "1",
    message:
      "안녕하세요 저는 민석마켓의 챗봇이에요 ^^ 저한테 아무말이나 입력하시면 제가 궁금증 해결을 해드릴게요?",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message:
      "관리자에게 문의하고 싶은 내용이 있다면 제가 대신 해결해 드릴게요~",
    trigger: "4",
  },
  {
    id: "4",
    message: "먼저 다음 카테고리중 문의하고 싶은 내용을 선택해주세요~",
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: "어떤플랫폼인가요?", label: "어떤플랫폼인가요", trigger: "6" },
      { value: "누가 만들었나요?", label: "누가 만들었나요?", trigger: "7" },
      {
        value: "거래는 어떻게 하나요?",
        label: "거래는 어떻게 하나요?",
        trigger: "8",
      },
      {
        value: "이제 궁금한게 없어요",
        label: "이제 궁금한게 없어요",
        trigger: "12",
      },
      {
        value: "추가건의사항",
        label: "추가건의사항",
        trigger: "12",
      },
    ],
  },
  {
    id: "6",
    message: "어떤플랫폼인가요?를 선택하셨습니다",
    trigger: "9",
  },
  {
    id: "7",
    message: "누가 만들었나요?를 선택하셨습니다.",
    trigger: "10",
  },
  {
    id: "8",
    message: "거래는 어떻게 하나요?를 선택하셨습니다.",
    trigger: "11",
  },
  {
    id: "9",
    message:
      "위 플랫폼은 민석님이 만든 영진전문대 선후배간 책,학용품 등을 판매 or 학교커뮤니티 시스템입니다",
    trigger: 5,
  },
  {
    id: "10",
    message: "민석님이 만들었습니당",
    trigger: 5,
  },
  {
    id: "11",
    message: "거래는 당근마켓과 비슷한 시스템으로 한다고 보시면 될거 같습니다",
    trigger: 5,
  },
  {
    id: "12",
    message: "챗봇이 도움이 되셨나요?",
    trigger: "13",
  },
  {
    id: "13",
    component: <CheckBox />,
    // waitAction: true,
    trigger: "14",
  },
  {
    id: "14",
    message: "챗봇을 이용해주셔서 감사합니다?",
    end: true,
  },
];
