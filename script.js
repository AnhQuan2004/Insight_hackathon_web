// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Add animation to sections when they come into view
  const sections = document.querySelectorAll(".section");
  const chartContainers = document.querySelectorAll(".chart-container");

  // Create an intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  // Observe all sections and chart containers
  sections.forEach((section) => {
    observer.observe(section);
  });

  chartContainers.forEach((container) => {
    observer.observe(container);
  });

  // Add hover effect for data points to show more information
  const dataPoints = document.querySelectorAll(".data-point");
  dataPoints.forEach((point) => {
    point.addEventListener("mouseenter", function () {
      this.classList.add("highlight");
    });

    point.addEventListener("mouseleave", function () {
      this.classList.remove("highlight");
    });
  });

  // Add a scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = "&uarr;";
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.body.appendChild(scrollTopBtn);

  // Show/hide scroll button based on scroll position
  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // Add chart animations on hover
  const chartCanvases = document.querySelectorAll("canvas");
  chartCanvases.forEach((canvas) => {
    const container = canvas.parentElement;

    container.addEventListener("mouseenter", function () {
      container.classList.add("chart-highlight");
    });

    container.addEventListener("mouseleave", function () {
      container.classList.remove("chart-highlight");
    });
  });

  // Toggle details for key insights
  const keyInsights = document.querySelectorAll(".key-insights li");
  keyInsights.forEach((insight) => {
    insight.addEventListener("click", function () {
      this.classList.toggle("expanded");
    });
  });

  // Add print functionality
  const printButton = document.createElement("button");
  printButton.textContent = "Print Report";
  printButton.className = "print-button";
  printButton.addEventListener("click", function () {
    window.print();
  });

  // Add the print button to the header
  const header = document.querySelector("header");
  header.appendChild(printButton);
});

// Add additional CSS styles for the new interactive elements
const additionalStyles = document.createElement("style");
additionalStyles.textContent = `
    .fade-in {
        animation: fadeIn 0.8s ease-in-out forwards;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .data-point.highlight {
        color: var(--accent-color);
        font-size: 1.1em;
        transition: all 0.3s ease;
    }
    
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        z-index: 1000;
    }
    
    .scroll-top-btn.visible {
        opacity: 0.8;
    }
    
    .scroll-top-btn:hover {
        opacity: 1;
        background-color: var(--secondary-color);
    }
    
    .chart-highlight {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 5px 15px rgba(0,0,0,0.15);
    }
    
    .key-insights li {
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 8px;
        border-radius: 4px;
    }
    
    .key-insights li:hover {
        background-color: rgba(52, 152, 219, 0.1);
    }
    
    .key-insights li.expanded {
        background-color: rgba(52, 152, 219, 0.2);
        padding: 12px;
        margin-bottom: 15px;
    }
    
    .print-button {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 8px 16px;
        background-color: rgba(255,255,255,0.2);
        color: white;
        border: 1px solid rgba(255,255,255,0.4);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .print-button:hover {
        background-color: rgba(255,255,255,0.3);
    }
    
    @media print {
        .scroll-top-btn, .print-button {
            display: none;
        }
        
        body {
            background-color: white;
        }
        
        .section, .chart-container {
            break-inside: avoid;
            box-shadow: none;
        }
    }
`;

document.head.appendChild(additionalStyles);
