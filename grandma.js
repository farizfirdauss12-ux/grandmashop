const menuContainer = document.getElementById("menuContainer");

let menuData = JSON.parse(localStorage.getItem("menuData")) || [
  { nama: "Ayam Penyet", harga: 10000, gambar: "ayam-penyet.png" },
  { nama: "Ayam Goreng", harga: 15000, gambar: "ayam-goreng.png" },
  { nama: "Ayam Rica-Rica", harga: 20000, gambar: "ayam-rica.png" },
  { nama: "Matcha", harga: 18000, gambar: "matcha.png" }
];

function renderMenu() {
  menuContainer.innerHTML = "";
  menuData.forEach((menu, index) => {
    menuContainer.innerHTML += `
      <div class="menu-card">
        <img src="${menu.gambar}">
        <h3>${menu.nama}</h3>
        <p>Rp${menu.harga.toLocaleString()}</p>

        <button class="btn-edit" onclick="editMenu(${index})">Edit</button>
        <button class="btn-delete" onclick="hapusMenu(${index})">Hapus</button>
      </div>
    `;
  });

  localStorage.setItem("menuData", JSON.stringify(menuData));
}

function simpanMenu() {
  const nama = document.getElementById("nama").value;
  const harga = document.getElementById("harga").value;
  const gambar = document.getElementById("gambar").value;
  const editIndex = document.getElementById("editIndex").value;

  if (!nama || !harga || !gambar) {
    alert("Lengkapi semua data!");
    return;
  }

  if (editIndex === "") {
    menuData.push({ nama, harga: parseInt(harga), gambar });
  } else {
    menuData[editIndex] = { nama, harga: parseInt(harga), gambar };
  }

  resetForm();
  renderMenu();
}

function editMenu(index) {
  const menu = menuData[index];
  document.getElementById("nama").value = menu.nama;
  document.getElementById("harga").value = menu.harga;
  document.getElementById("gambar").value = menu.gambar;
  document.getElementById("editIndex").value = index;
}

function hapusMenu(index) {
  if (confirm("Yakin hapus menu ini?")) {
    menuData.splice(index, 1);
    renderMenu();
  }
}

function resetForm() {
  document.getElementById("nama").value = "";
  document.getElementById("harga").value = "";
  document.getElementById("gambar").value = "";
  document.getElementById("editIndex").value = "";
}

renderMenu();
