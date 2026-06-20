const cloudinary = require("../Config/cloudinary");
const streamifier = require("streamifier");

const uploadFromUrl = async (url) => {
  console.log("Uploading: ", url);

  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: "user_profiles",
      resource_type: "image",
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

const uploadFromBuffer = async (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "user_profiles",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary Buffer Upload Error:", error);
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          });
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

const isCloudinaryUrl = (
  url = "https://img.freepik.com/premium-vector/human-icon_970584-3.jpg?semt=ais_hybrid&w=740&q=80"
) => {
  if (!url) return false;

  return url.includes("res.cloudinary.com");
};

module.exports = { uploadFromUrl, uploadFromBuffer, isCloudinaryUrl };
