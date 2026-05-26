document.addEventListener("DOMContentLoaded", () => {
    // ➔ NHỚ DÁN LINK API VÀO ĐÂY:
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz03hI849YqIdrF4ujbxeltFLq9zE2d_5YuflRim5ww4tKCveuwdyvk7k3BN91ZAVBp/exec";
    const isEnglish = window.location.href.includes('en.html');

    // ==========================================
    // 1. THÔNG BÁO TỪ GOOGLE DOCS & MARQUEE ANIMATION
    // ==========================================
    const annBar = document.getElementById('announcementBar');
    const annText = document.getElementById('announcementText');
    const annContainer = document.getElementById('announcementTextContainer');
    const annCloseBtn = document.getElementById('closeAnnouncement');
    let marqueeAnimation = null;

    if (annBar && annText && annCloseBtn) {
        annCloseBtn.addEventListener('click', () => { annBar.style.display = 'none'; });

        async function fetchAnnouncement() {
            if(GOOGLE_SCRIPT_URL.includes("DÁN_LINK")) return;
            try {
                const res = await fetch(GOOGLE_SCRIPT_URL, { redirect: 'follow' });
                const data = await res.json();

                if (data && data.status === "success" && data.text.trim().length > 0) {
                    annText.innerText = data.text.trim();
                    annBar.style.display = 'flex';
                    // Chờ DOM load xong mới tính toán kích thước
                    setTimeout(startMarquee, 500);
                } else {
                    annBar.style.display = 'none';
                }
            } catch (error) { console.error("Lỗi tải thông báo:", error); }
        }

        function startMarquee() {
            if (!annText.animate || !annContainer) return;
            if (marqueeAnimation) marqueeAnimation.cancel(); // Reset nếu đang chạy

            const containerWidth = annContainer.clientWidth;
            const textWidth = annText.scrollWidth;

            if (textWidth > containerWidth) {
                const distance = textWidth - containerWidth + 40;

                marqueeAnimation = annText.animate([
                    { transform: 'translateX(0)' },
                                                   { transform: `translateX(-${distance}px)` }
                ], { duration: distance * 25, easing: 'linear', delay: 1500, fill: 'forwards' });

                marqueeAnimation.onfinish = () => {
                    annText.style.transform = 'translateX(0)';
                    startMarquee();
                };
            } else {
                annText.style.transform = 'translateX(0)';
            }
        }

        // Tự động tính toán lại chữ chạy nếu người dùng xoay màn hình điện thoại
        window.addEventListener('resize', () => {
            if (annBar.style.display === 'flex') {
                annText.style.transform = 'translateX(0)';
                if (marqueeAnimation) marqueeAnimation.cancel();
                setTimeout(startMarquee, 300);
            }
        });

        fetchAnnouncement();
    }

    // ==========================================
    // 2. CHUYỂN TAB MƯỢT MÀ
    // ==========================================
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetId = this.getAttribute('data-tab');
            if(!targetId) return;
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            tabContents.forEach(tab => tab.classList.remove('active'));
            const targetTab = document.getElementById(targetId);
            if (targetTab) targetTab.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // ==========================================
    // 3. FORM GÓP Ý THÔNG MINH (DYNAMIC FORM)
    // ==========================================
    const requestTypeInput = document.getElementById('requestType');
    const issueLabel = document.getElementById('issueLabel');
    const issueField = document.getElementById('issueField');
    const hideEvdCheckbox = document.getElementById('hideEvidence');

    function updateIssuePrompt() {
        if (!requestTypeInput || !issueLabel || !issueField) return;
        const selected = requestTypeInput.value;

        if (selected === "gopy") {
            issueLabel.innerText = isEnglish ? "What would you like to suggest?" : "Bạn muốn góp ý gì?";
            issueField.placeholder = isEnglish ? "Describe the feature or idea..." : "Ghi rõ tính năng hoặc ý tưởng bạn muốn thêm...";
        } else if (selected === "baoloi") {
            issueLabel.innerText = isEnglish ? "What bug did you find?" : "Bạn muốn báo lỗi gì?";
            issueField.placeholder = isEnglish ? "Describe how the bug happens..." : "Ghi rõ lỗi xảy ra như thế nào, ở đâu...";
        } else if (selected === "tocao") {
            issueLabel.innerText = isEnglish ? "Who are you reporting and why?" : "Bạn muốn tố cáo ai và vì sao?";
            issueField.placeholder = isEnglish ? "Name the player and their action..." : "Ghi rõ tên người vi phạm và hành vi của họ...";
            if (hideEvdCheckbox) {
                hideEvdCheckbox.checked = true; // Chỉ tự động tick, không khóa (disabled)
            }
        }
    }

    if (requestTypeInput) {
        requestTypeInput.addEventListener('change', updateIssuePrompt);
        updateIssuePrompt(); // Khởi chạy lần đầu
    }

    // ==========================================
    // 4. XỬ LÝ GỬI FORM XUYÊN TƯỜNG LỬA
    // ==========================================
    const form = document.getElementById("supportForm");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            if(GOOGLE_SCRIPT_URL.includes("DÁN_LINK")) {
                alert(isEnglish ? "Error: API Link missing!" : "Lỗi: Chưa cấu hình Link API!");
                return;
            }

            const btn = document.getElementById("submitBtn");
            const originalText = btn ? btn.innerText : (isEnglish ? "Submit" : "Gửi yêu cầu");
            if(btn) { btn.innerText = isEnglish ? "Submitting..." : "Đang gửi đi..."; btn.disabled = true; }

            const reqType = document.getElementById("requestType");
            const pName = document.getElementById("playerName");
            const isAnon = document.getElementById("isAnonymous");
            const evdLink = document.getElementById("evidenceLink");
            const pContent = document.getElementById("playerContent");

            const formData = new URLSearchParams();
            formData.append("type", reqType ? reqType.value : "");
                              formData.append("playerName", pName ? pName.value : "");
                              formData.append("isAnonymous", (isAnon && isAnon.checked) ? "true" : "false");
                              formData.append("hideEvidence", (hideEvdCheckbox && hideEvdCheckbox.checked) ? "true" : "false");
                              formData.append("issue", issueField ? issueField.value : "");
                              formData.append("evidence", evdLink ? evdLink.value : "");
                              formData.append("content", pContent ? pContent.value : "");

                              // --- THÀNH PHẦN SỐ 3 ĐƯỢC THÊM VÀO ĐÂY ---
                              // Tạo bộ đếm thời gian tự hủy sau 10 giây nếu Apps Script không phản hồi
                              const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            try {
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    body: formData,
                    redirect: 'follow', // Fix lỗi CORS khi Google điều hướng API
                    signal: controller.signal // Gắn tín hiệu hủy request vào fetch
                });

                // Gửi thành công hoặc nhận được phản hồi thì xóa bộ đếm timeout
                clearTimeout(timeoutId);
                const result = await response.json();

                if(result.result === "success") {
                    alert(isEnglish ? "Success! Your request has been recorded." : "Ý kiến của bạn đã được ghi nhận, cảm ơn bạn!");
                    form.reset();
                              updateIssuePrompt(); // Reset lại form
                } else {
                    throw new Error(result.error || "Unknown Error");
                }
            } catch(error) {
                // Xóa bộ đếm nếu nhảy vào lỗi
                clearTimeout(timeoutId);
                console.error(error);

                // Nếu lỗi do hết 10 giây (bị hủy chủ động) hoặc lỗi CORS chặn response
                if (error.name === 'AbortError') {
                    alert(isEnglish ? "Connection timeout! Please check your internet." : "Kết nối quá hạn! Vui lòng kiểm tra lại mạng.");
                } else {
                    alert(isEnglish ? "Request sent, but we couldn't verify the server response." : "Yêu cầu đã được gửi đi (Nếu mạng chậm, bạn hãy kiểm tra lại trên Discord/Sheets nhé).");
                }
            } finally {
                if(btn) { btn.innerText = originalText; btn.disabled = false; }
            }
        });
    }
    // ==========================================
    // 5. GIAO DIỆN THEME & HIỆU ỨNG (ANIMATION)
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        if (savedTheme === "dark") { document.body.setAttribute("data-theme", "dark"); themeToggle.checked = true; }
        themeToggle.addEventListener("change", function() {
            if (this.checked) { document.body.setAttribute("data-theme", "dark"); localStorage.setItem("theme", "dark"); }
            else { document.body.removeAttribute("data-theme"); localStorage.setItem("theme", "light"); }
        });
    }

    const animToggle = document.getElementById('animToggle');
    if (animToggle) {
        if(localStorage.getItem("noAnim") === "true") { document.body.classList.add("no-anim"); animToggle.checked = false; }
        animToggle.addEventListener("change", function() {
            if (this.checked) { document.body.classList.remove("no-anim"); localStorage.setItem("noAnim", "false"); }
            else { document.body.classList.add("no-anim"); localStorage.setItem("noAnim", "true"); }
        });
    }

    // ==========================================
    // 6. ZOOM ẢNH TỐI ƯU & ACCESSIBILITY
    // ==========================================
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const modalCloseBtn = document.getElementById("closeModalBtn");

    document.querySelectorAll(".zoomable").forEach(img => {
        img.addEventListener("click", function() {
            if (modal && modalImg) {
                modal.style.display = "block"; setTimeout(() => modal.classList.add("show"), 10);
                modalImg.src = this.src; document.body.style.overflow = "hidden";
            }
        });
    });

    const closeModal = () => {
        if (modal) { modal.classList.remove("show"); setTimeout(() => { modal.style.display = "none"; document.body.style.overflow = "auto"; }, 250); }
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
    if (modal) modal.addEventListener("click", e => { if (e.target !== modalImg) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    // ==========================================
    // 7. TÌM KIẾM THẺ LỆNH NHANH
    // ==========================================
    const searchInput = document.getElementById("commandSearch");
    if (searchInput) {
        searchInput.addEventListener("input", function() {
            let filter = this.value.toLowerCase().trim();
            document.querySelectorAll(".cmd-item").forEach(item => {
                let text = (item.textContent || item.innerText).toLowerCase();
                item.style.display = text.includes(filter) ? "" : "none";
            });
        });
    }

    // ==========================================
    // 8. ĐỒNG BỘ CHUYỂN NGÔN NGỮ
    // ==========================================
    const langSelect = document.getElementById("langSelect");
    if (langSelect) {
        langSelect.value = isEnglish ? "en" : "vi";
        langSelect.addEventListener("change", function() {
            if (this.value === "en") window.location.href = "en.html";
            else window.location.href = "index.html";
        });
    }
});
