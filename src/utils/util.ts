interface resultInfo {
  success: boolean;
  errMsg?: string;
  data: any;
}

export function getReponseInfo(data: any, errMsg?: string): resultInfo {
  if (errMsg) {
    return {
      success: false,
      errMsg: errMsg,
      data: null,
    };
  } else {
    return {
      success: true,
      data: data,
    };
  }
}
