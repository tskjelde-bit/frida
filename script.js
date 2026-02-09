document.addEventListener('DOMContentLoaded', () => {

    // Tab Functionality
    window.openTab = function (evt, tabName) {
        // Hide all tab contents
        const tabContents = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabContents.length; i++) {
            tabContents[i].classList.remove("active");
        }

        // Remove active class from all buttons
        const tabButtons = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove("active");
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tabName).classList.add("active");

        // Handle event currentTarget if available, otherwise find button by index logic or similar
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add("active");
        } else {
            // Fallback if triggered manually
            // This assumes simple correlation, might need adjustment if complex
        }
    }

    // Checklist Logic
    window.toggleCheck = function (element) {
        element.classList.toggle("checked");
        updateProgress();
        saveProgress();
    }

    // Progress Bar Logic
    function updateProgress() {
        const checklistItems = document.querySelectorAll(".checklist li");
        const checkedItems = document.querySelectorAll(".checklist li.checked");

        const total = checklistItems.length;
        const checked = checkedItems.length;

        const progress = total > 0 ? (checked / total) * 100 : 0;

        const progressBar = document.getElementById("progressBar");
        const progressText = document.getElementById("progressText");

        if (progressBar && progressText) {
            progressBar.style.width = progress + "%";
            progressText.textContent = Math.round(progress) + "% fullført";
        }
    }

    // Local Storage Persistence
    function saveProgress() {
        const checkedIndices = [];
        const checklistItems = document.querySelectorAll(".checklist li");

        checklistItems.forEach((item, index) => {
            if (item.classList.contains('checked')) {
                checkedIndices.push(index);
            }
        });

        localStorage.setItem('fridaLinkedInProgress', JSON.stringify(checkedIndices));
    }

    function loadProgress() {
        const savedProgress = localStorage.getItem('fridaLinkedInProgress');
        if (savedProgress) {
            const checkedIndices = JSON.parse(savedProgress);
            const checklistItems = document.querySelectorAll(".checklist li");

            checkedIndices.forEach(index => {
                if (checklistItems[index]) {
                    checklistItems[index].classList.add('checked');
                }
            });

            updateProgress();
        }
    }

    // Initialize
    loadProgress();

});
