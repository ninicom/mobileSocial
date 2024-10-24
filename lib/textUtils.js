// textUtils.js
export function shortenText(text, maxLength = 25) {
    if(text){
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }
      return text;
    }
    return text;
  }
  