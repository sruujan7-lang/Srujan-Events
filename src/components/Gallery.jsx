import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import "../styles/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: "all", label: "All Events" },
    { id: "wedding", label: "Weddings" },
    { id: "corporate", label: "Corporate" },
    { id: "birthday", label: "Birthdays" },
    { id: "cultural", label: "Cultural" },
  ];

  // Sample gallery data
  const sampleImages = [
    {
      id: 1,
      url: "https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "wedding",
      title: "Elegant Wedding Ceremony",
      description: "Beautiful destination wedding with stunning decorations",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "wedding",
      title: "Reception Hall",
      description: "Grand reception with beautiful lighting",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "corporate",
      title: "Corporate Conference",
      description: "Professional conference setup",
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "birthday",
      title: "Birthday Celebration",
      description: "Colorful birthday party setup",
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "cultural",
      title: "Cultural Festival",
      description: "Traditional cultural event",
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "wedding",
      title: "Outdoor Wedding",
      description: "Beautiful outdoor wedding ceremony",
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "corporate",
      title: "Business Meeting",
      description: "Executive business meeting setup",
    },
    {
      id: 8,
      url: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "birthday",
      title: "Kids Birthday Party",
      description: "Fun children's birthday celebration",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setImages(sampleImages);
      setFilteredImages(sampleImages);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredImages(images);
    } else {
      setFilteredImages(
        images.filter((img) => img.category === selectedCategory)
      );
    }
  }, [selectedCategory, images]);

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateModal = (direction) => {
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex =
        (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  if (loading) {
    return (
      <section id="gallery" className="gallery section">
        <div className="container">
          <div className="loading">Loading gallery...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gallery section">
      <div className="container">
        <h2 className="section-title">Our Gallery</h2>
        <p className="section-subtitle">
          Explore our portfolio of beautifully executed events and celebrations.
        </p>

        <div className="gallery-filters">
          <Filter size={20} />
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${
                selectedCategory === category.id ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item"
              onClick={() => openModal(image)}
            >
              <img src={image.url} alt={image.title} />
              <div className="gallery-overlay">
                <h4>{image.title}</h4>
                <p>{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="no-images">
            <p>No images found for this category.</p>
          </div>
        )}
      </div>

      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <button
              className="modal-nav modal-prev"
              onClick={() => navigateModal("prev")}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="modal-nav modal-next"
              onClick={() => navigateModal("next")}
            >
              <ChevronRight size={24} />
            </button>

            <img src={selectedImage.url} alt={selectedImage.title} />

            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
