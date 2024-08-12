function calculateBMI() {
    // Mengambil Values dari Input Field
    var beratBadan = document.getElementById("beratBadan").value;
    var tinggiBadan = document.getElementById("tinggiBadan").value;
    var usia = document.getElementById("usia").value;

    // Memberikan Validasi untuk setiap Field Input jika terisi atau tidak 
    if (beratBadan === "" || tinggiBadan === "" || usia === "") {
        alert("Mohon isi semua data yang diperlukan sebelum menghitung BMI."); // Memberikan Alert Notifikasi Jika Field ada yang tidak terisi
        return; // Jika Validasi Gagal maka function akan kembali
    }

    // Konversi tinggi Badan dari cm ke meter
    tinggiBadan = tinggiBadan / 100;

    // Rumus Perhitungan Mencari BMI
    var bmi = (beratBadan / (tinggiBadan * tinggiBadan)).toFixed(1);

    // Menentukan Kategori dan Deskripsi BMI
    var category = "";
    var description = "";
    var range = "";
    var solution = "";
    var anjuran = "";

    // Menentukan kategori dan gaya
    var bmiClass = ""; 

    if (bmi < 18.5) {
        category = "Berat Badan Kurang";
        range = "di bawah 18.5";
        description = "Anda memiliki berat badan kurang.";
        solution = "Menaikan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.";
        anjuran = "Menaikan berat badan hingga batas normal.";
        bmiClass = "bmi-underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Berat Badan Ideal";
        range = "antara 18.5 dan 24.9";
        description = "Anda memiliki berat badan ideal.";
        solution = "Menjaga berat badan adalah dengan menjaga pola makan yang dikonsumsi dan berolahraga.";
        anjuran = "Menjaga berat badan tetap normal.";
        bmiClass = "bmi-ideal";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Berat Badan Lebih";
        range = "antara 25 dan 29.9";
        description = "Anda memiliki berat badan berlebih.";
        solution = "Menurunkan berat badan adalah dengan mengatur kalori makanan yang dikonsumsi dan berolahraga.";
        anjuran = "Menurunkan berat badan hingga batas normal.";
        bmiClass = "bmi-overweight";
    } else {
        category = "Obesitas";
        range = "di atas 30";
        description = "Anda memiliki berat badan obesitas.";
        solution = "Menurunkan berat badan adalah dengan bersegeralah mengatur kalori makanan yang dikonsumsi dan berolahraga.";
        anjuran = "Segera turunkan berat badan hingga batas normal.";
        bmiClass = "bmi-obese";
    }

    document.getElementById("bmiValue").textContent = bmi;
    document.getElementById("bmiCategory").textContent = category;
    document.getElementById("bmiDescription").textContent = description;
    document.getElementById("bmiRange").textContent = range;
    document.getElementById("bmiSolution").textContent = solution;
    document.getElementById("bmiAnjuran").textContent = anjuran;
    document.getElementById("bmiCategoryText").textContent = category;

    // Menambahkan kelas CSS yang sesuai
    var resultElem = document.getElementById("bmiResult");
    resultElem.className = "bmi-result " + bmiClass;

    // Untuk Menampilkan Section Hasil
    resultElem.style.display = "block";
}

// Memberikan Event Listener ke tombol reset
document.getElementById("resetButton").addEventListener("click", function() {
    // Menyembunyikan Section Hasil
    document.getElementById("bmiResult").style.display = "none";
});

// Membuat fungsi tombol download hasil
function downloadBMI() {
    var bmi = document.getElementById("bmiValue").textContent;
    var category = document.getElementById("bmiCategory").textContent;
    var description = document.getElementById("bmiDescription").textContent;

    var data = `BMI Anda: ${bmi}\nKategori: ${category}\nDeskripsi: ${description}`;

    var blob = new Blob([data], { type: 'text/plain' }); // Menyimpan Hasil Data ke format txt
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.href = url;
    a.download = 'Hasil_BMI.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Background Animation
function initBackground() {
    var canvas = document.getElementById('backgroundCanvas');
    var context = canvas.getContext('2d');
    var maxx = window.innerWidth;
    var maxy = window.innerHeight;
    var halfx = maxx / 2;
    var halfy = maxy / 2;
    var dotCount = 200;
    var dots = [];
  
    canvas.width = maxx;
    canvas.height = maxy;
  
    for (var i = 0; i < dotCount; i++) {
      dots.push(new dot());
    }
  
    function render() {
      context.fillStyle = "#000000";
      context.fillRect(0, 0, maxx, maxy);
      for (var i = 0; i < dotCount; i++) {
        dots[i].draw();
        dots[i].move();
      }
      requestAnimationFrame(render);
    }
  
    function dot() {
      this.rad_x = 2 * Math.random() * halfx + 1;
      this.rad_y = 1.2 * Math.random() * halfy + 1;
      this.alpha = Math.random() * 360 + 1;
      this.speed = Math.random() * 100 < 50 ? 1 : -1;
      this.speed *= 0.1;
      this.size = Math.random() * 5 + 1;
      this.color = Math.floor(Math.random() * 256);
    }
  
    dot.prototype.draw = function() {
      var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
      var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
      context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
      context.fillRect(dx, dy, this.size, this.size);
    };
  
    dot.prototype.move = function() {
      this.alpha += this.speed;
      if (Math.random() * 100 < 50) {
        this.color += 1;
      } else {
        this.color -= 1;
      }
    };
  
    render();
  
    window.addEventListener('resize', function() {
      maxx = window.innerWidth;
      maxy = window.innerHeight;
      halfx = maxx / 2;
      halfy = maxy / 2;
      canvas.width = maxx;
      canvas.height = maxy;
    });
  }
  
  initBackground();
