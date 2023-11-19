export class schoolInfoDto {
  /**
   * 시도교육청코드
   * @example "B10"
   */
  eduDeptCode: string;

  /**
   * 시도교육청명
   * @example "서울특별시교육청"
   */
  eduDeptName: string;

  /**
   * 행정표준 학교코드
   * @example "7010059"
   */
  schoolCode: string;

  /**
   * 학교명
   * @example "경기고등학교"
   */
  schoolName: string;

  /**
   * 영문학교명
   * @example "Kyunggi High School"
   */
  engSchoolName?: string;

  /**
   * 학교종류명
   * @example "고등학교"
   */
  schoolKindName: string;

  /**
   * 시도명
   * @example "서울특별시"
   */
  localCityName: string;

  /**
   * 관할조직명
   * @example "서울특별시교육청"
   */
  localOrgName: string;

  /**
   * 설립명(공립/사립 구분)
   * @example "공립"
   */
  categoryName: string;

  /**
   * 우편번호
   * @example "06086"
   */
  postalCode: string;

  /**
   * 주소
   */
  address: {
    /**
     * 주소
     * @example "서울특별시 강남구 영동대로 643"
     */
    line1: string;

    /**
     * 상세주소
     * @example "/ 경기고등학교 (삼성동)"
     */
    line2: string;
  };

  /**
   * 전화번호
   * @example "02-3496-7300"
   */
  telNumber: string;

  /**
   * 홈페이지주소
   * @example "http://kyunggi.hs.kr"
   */
  website: string;

  /**
   * 남녀공학구분명
   * @example "남"
   */
  coEduType: string;

  /**
   * 팩스번호
   * @example "02-3496-7497"
   */
  faxNumber: string;

  /**
   * 고등학교구분명
   * @example "일반고"
   */
  highGradeType?: string;

  /**
   * 산업체 특별학급 존재 여부
   * @example false
   */
  hasIndustrialClass?: boolean;

  /**
   * 고등학교 일반/전문 구분명
   * @example "일반계"
   */
  highSchoolType?: string;

  /**
   * 특수목적 고등학교 계열명
   */
  specialHighSchoolType?: string;

  /**
   * 입시 전/후기 구분명
   * @example "후기"
   */
  admissionType?: string;

  /**
   * 주/야 구분명
   * @example "주간"
   */
  dayNightType?: string;

  /**
   * 설립일자
   * @example "1900-10-03T00:00:00+09:00[Asia/Seoul]"
   */
  foundedDate: string;

  /**
   * 개교기념일
   * @example "1900-10-03T00:00:00+09:00[Asia/Seoul]"
   */
  foundDay: string;

  /**
   * 수정일자
   * @example "2023-06-15T00:00:00+09:00[Asia/Seoul]"
   */
  updatedDate: string;
}

export default schoolInfoDto;
