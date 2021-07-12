import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dqu61o0vv",
  api_key: "392641487953191",
  api_secret: "zw-2YOrKGREqDqfEOMb9r0OTasM",
  secure: true,
});

describe("fileUpload", () => {
  test("debe subir el archivo y retornar URL", async (done) => {
    jest.setTimeout(30000);
    const resp = await fetch(
      "https://cdn.shopify.com/s/files/1/1679/3493/articles/Portada_Blog_fotososcuras.png?v=1545327040"
    );

    const blob = await resp.blob();
    const file = new File([blob], "foto.png");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });

  test("debe retornar un error", async () => {
    jest.setTimeout(15000);
    const file = new File([], "foto.png");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
