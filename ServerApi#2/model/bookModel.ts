
export function getDataFromBody(req: any) {
  return new Promise((resolve, reject) => {
    try {
      let data: string = "";
      req.on("data", (chunck: any) => {
        data += chunck.toString();
      });
      req.on("end", () => resolve(data));
    } catch (err) {
      reject(err);
    }
  });
}

