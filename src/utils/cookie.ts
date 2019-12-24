export const getCookie = (name: string) => {
  var arr = document.cookie.replace(/\s/g, '').split('&')
  for (var i = 0; i < arr.length; i++) {
    var tempArr = arr[i].split('=')
    if (tempArr[0] === name) {
      return decodeURIComponent(tempArr[1])
    }
  }
  return ''
}

export const setCookie = (name: string, value: string, minute: number) => {
  var exp: Date = new Date()
  exp.setTime(exp.getTime() + minute * 1000 * 60)
  document.cookie = name + '=' + value + ';expires='
}

export const delCookie = (name: string) => {
  setCookie(name, '1', -1)
}
