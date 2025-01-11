// // projectData.js


// import { accessToken } from "./auth/auth.js";

// const dummyData = {
//   metadata: [
//     {
//       title: "Project Alpha",
//       size: "20 MB",
//       files: 10,
//       lastAccessed: "2024-12-20",
//     },
//     {
//       title: "Project Beta",
//       size: "15 MB",
//       files: 8,
//       lastAccessed: "2024-12-18",
//     },
//     {
//       title: "Project Gamma",
//       size: "50 MB",
//       files: 25,
//       lastAccessed: "2024-12-15",
//     },
//   ],
//   photos: {
//     "Project Alpha": Array.from(
//       { length: 20 },
//       (_, i) => `https://picsum.photos/150?project=1&random=${i}`
//     ),
//     "Project Beta": Array.from(
//       { length: 15 },
//       (_, i) => `https://picsum.photos/150?project=2&random=${i}`
//     ),
//     "Project Gamma": Array.from(
//       { length: 25 },
//       (_, i) => `https://picsum.photos/150?project=3&random=${i}`
//     ),
//   },
// };

// let metadataCache = null;
// let photoCache = {};

// async function fetchMetadata() {
//   if (!metadataCache) {
//     console.log("Fetching metadata from server...");
//     console.log(accessToken);
//     if (!accessToken) {
//       throw new Error("No access token available. Please log in.");
//     }

//     try {
//       const response = await fetch(
//         "https://f6937s1abf.execute-api.us-west-2.amazonaws.com/default/getMetadata",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `${accessToken}`, // Attach the JWT token
//           },
//         }
//       ).then((res) => res.json());
//       console.log(response);

//       metadataCache = adaptRawData(response.items);
//     } catch (err) {
//       throw new Error(`Failed to fetch metadata: ${err}`);
//     }
//   }
//   return metadataCache;
// }
// const formatSize = (bytes) => {
//   const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
//   let i = 0;
//   while (bytes >= 1024 && i < units.length - 1) {
//     bytes /= 1024;
//     i++;
//   }
//   return `${bytes.toFixed(2)} ${units[i]}`;
// };

// function adaptRawData(rawDataArray){
//   return rawDataArray.map((data,index) => ({
//     ...data,
//     size: formatSize(data.bytes), // Convert bytes to megabytes
//     shootDate: new Date(data.shootDate).toISOString(), // Convert to ISO string
//     lastModified: new Date(data.lastModified).toISOString(), // Convert to ISO string
//     id:index
//   }));
// }
// // async function fetchLowQualityImages(projectId) {
// //     const response = await fetch(`https://your-api-gateway-endpoint/fetchImages?projectId=${projectId}`);
// //     return response.json();
// // }
// // async function fetchMetadata() {
// //   if (!metadataCache) {
// //     console.log("Fetching metadata from server...");
// //     metadataCache = dummyData.metadata;
// //   }
// //   return metadataCache;
// // }

// async function fetchLowQualityImages(projectId) {
//   if (!photoCache[projectId]) {
//     console.log(`Fetching photos for project ${projectId} from server...`);
//     photoCache[projectId] = dummyData.photos[projectId];
//   }
//   return photoCache[projectId];
// }

// export { fetchMetadata, fetchLowQualityImages };
