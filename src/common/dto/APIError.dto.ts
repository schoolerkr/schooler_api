export class APIError {
  /**
   * 에러 코드 (ENUM)
   * @example 'INTERNAL_SERVER_ERROR'
   */
  private code: string = 'INTERNAL_SERVER_ERROR';

  /**
   * 에러 메시지
   * @example '내부 서버 오류가 발생했습니다.'
   */
  private message: string = '내부 서버 오류가 발생했습니다.';

  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

export default APIError;
