export const getBase64ImageFromUrl = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

    return blob;
//   return new Promise((resolve, reject) => {
//     var reader = new FileReader();
//     reader.addEventListener(
//       'load',
//       function () {
//         resolve(reader.result);
//       },
//       false
//     );

//     reader.onerror = () => {
//       return reject(this);
//     };
//     reader.readAsDataURL(blob);
//   });
};
