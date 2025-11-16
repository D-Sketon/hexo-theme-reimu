hexo.extend.tag.register(
  "gallery",
  function (args, content) {
    const css = hexo.extend.helper.get("css").bind(hexo);
    const html = hexo.render.renderSync({ text: content, engine: "markdown" });

    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
    let match;
    const imageUrls = [];
    while ((match = imgRegex.exec(html)) !== null) {
      imageUrls.push(match[1]);
    }

    const galleryId = `photoWall-${Math.random().toString(36).substr(2, 9)}`;
    const galleryHtml = `
<div class="gallery-wall" id="${galleryId}"></div>
<script>
  (function() {
    const imageUrls = ${JSON.stringify(imageUrls)};
    let images = [];
    const wallId = '#${galleryId}';
    let resizeTimer;
    let lastWidth = 0;
    
    function init() {
      createInitialDOM();
      loadImages();
      const wall = _$(wallId);
      if (wall && window.ResizeObserver) {
        const observer = new ResizeObserver((entries) => {
          const newWidth = entries[0].contentRect.width;
          if (Math.abs(newWidth - lastWidth) > 1) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(renderPhotoWall, 250);
          }
        });
        observer.observe(wall);
      } else {
        window.addEventListener('resize', handleResize);
      }
    }
    
    function createInitialDOM() {
      const wall = _$(wallId);
      if (!wall || !imageUrls.length) return;
      
      wall.style.opacity = '0';
      wall.style.pointerEvents = 'none';
      
      imageUrls.forEach((url) => {
        images.push({
          width: 800,
          height: 600,
          aspectRatio: 4/3,
          url: url,
          loaded: false
        });
      });
      
      renderPhotoWall();
    }
    
    function loadImages() {
      const loadPromises = imageUrls.map((url, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            if (images[index]) {
              images[index].width = img.naturalWidth;
              images[index].height = img.naturalHeight;
              images[index].aspectRatio = img.naturalWidth / img.naturalHeight;
              images[index].loaded = true;
            }
            resolve();
          };
          img.onerror = () => {
            if (images[index]) {
              images[index].loaded = true;
            }
            resolve();
          };
          img.src = url;
        });
      });
      
      Promise.all(loadPromises)
        .then(() => {
          const wall = _$(wallId);
          if (wall) {
            wall.style.opacity = '1';
            wall.style.pointerEvents = 'auto';
            wall.style.transition = 'opacity 0.3s ease';
          }
          renderPhotoWall();
        })
        .catch((error) => console.error("图片加载失败:", error));
    }
    
    function renderPhotoWall() {
      const wall = _$(wallId);
      
      if (!images.length || !wall) return;
      
      const screenWidth = wall.offsetWidth || window.innerWidth - 40;
      lastWidth = screenWidth;
      
      wall.innerHTML = "";
      const rowHeight = 200;
      const gap = 10;
      const maxPerRow = 4;
      
      let row = [];
      let rowWidth = 0;
      const rows = [];
      
      images.forEach((img) => {
        const scaledWidth = rowHeight * img.aspectRatio;
        
        if (rowWidth + scaledWidth <= screenWidth && row.length < maxPerRow) {
          row.push(img);
          rowWidth += scaledWidth + gap;
        } else {
          if (row.length) rows.push(row);
          row = [img];
          rowWidth = scaledWidth + gap;
        }
      });
      
      if (row.length) rows.push(row);
      
      rows.forEach((row) => {
        const rowDiv = document.createElement("div");
        rowDiv.style.cssText = \`display: flex; gap: \${gap}px; width: 100%\`;
        
        row.forEach((img) => {
          const item = document.createElement("div");
          item.className = "photo-item";
          const flex = row.length === 1 ? '1' : img.aspectRatio;
          item.style.cssText = \`flex: \${flex}; height: \${rowHeight}px\`;
          
          const imgEl = document.createElement("img");
          imgEl.alt = "Gallery Image";
          imgEl.style.cssText = "width: 100%; height: 100%; object-fit: cover";
          imgEl.className = "lazyload";
          imgEl.dataset.src = img.url;
          imgEl.dataset.sizes = "auto";

          const link = document.createElement("a");
          link.href = img.url;
          link.dataset.pswpWidth = img.width;
          link.dataset.pswpHeight = img.height;
          link.target = "_blank";
          link.className = "article-gallery-item";
          link.style.cssText = "width: 100%; height: 100%";
          link.appendChild(imgEl);
          
          item.appendChild(link);
          rowDiv.appendChild(item);
        });
        
        wall.appendChild(rowDiv);
      });
    }
    
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderPhotoWall, 250);
    }
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
</script>
${css("css/gallery")}
  `;
    return galleryHtml;
  },
  { ends: true }
);
