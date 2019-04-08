export function cleanInput(input) {
  let search = [/<script[^>]*?>.*?<\/script>/i, /<[\/\!]*?[^<>]*?>/i, /<style[^>]*?>.*?<\/style>/iu, /<![\s\S]*?--[ \t\n\r]*>/i];
  let output;
  for (let i = 0; i < 4; i++) {
    input = input.replace(search[i], '');
  }
  return input;
}

export function sanitize(input) {
  let output;
  if (Array.isArray(input)) {
    output = input.map(function(index) {
      return sanitize(index);
    });
  } else {
    input = cleanInput(input);
    output = input.replace('/[\'\"]/','\\\'');
  }
  return output;
}
