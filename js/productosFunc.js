async function getArticulos() {
  const URL = "../db/data.json";
  let data = null;
  try {
    const response = await fetch(URL);
    data = await response.json();
  } catch (err) {
    console.log("ERR: ", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `Error acceso DATOS. ERROR: ${err}`,
    });
  } finally {
    return data;
  }
}
