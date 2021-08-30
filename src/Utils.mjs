// file: /Users/brekk/work/madland/madlib-website/src/Utils.mad
export let slug = (s => s.toLowerCase().replace(/\s/g, '-').replace(/[,\.]/g, ''));
export default { slug };
