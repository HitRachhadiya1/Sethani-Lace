import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <div className="my-10">
      {/* Header Section */}
      <div className="text-center py-8">
        <Title text1={"ABOUT"} text2={"US"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mb-8">
          Discover the story behind Sethani Lace, a heritage of exquisite
          craftsmanship since 1985.
        </p>
      </div>

      {/* Company Introduction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 max-w-6xl mx-auto">
        <div className="order-2 md:order-1">
          <h2 className="text-2xl font-medium text-[#414141] mb-4">
            Our Heritage
          </h2>
          <p className="text-gray-600 mb-4">
            Founded in 1985, Sethani Lace has established itself as one of
            India's premier manufacturers and exporters of high-quality lace
            fabrics. With our headquarters in Surat, Gujarat—the textile hub of
            India—we combine traditional craftsmanship with modern technology to
            create exquisite lace designs that adorn garments across the globe.
          </p>
          <p className="text-gray-600 mb-4">
            What began as a small family enterprise has flourished into a
            renowned name in the textile industry, serving clients across six
            continents. Our dedication to quality, innovation, and customer
            satisfaction has enabled us to maintain enduring relationships with
            fashion houses, garment manufacturers, and retailers worldwide.
          </p>
          <div className="flex items-center gap-2 mt-6">
            <p className="font-semibold text-sm md:text-base">DISCOVER MORE</p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
        <div className="order-1 md:order-2 border border-[#414141]">
          <img
            src="https://images.unsplash.com/photo-1551446591-142875a901a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Lace Manufacturing"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission and Vision */}
      <div className="bg-gray-50 py-16 px-4 sm:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium text-[#414141] mb-4">
              Our Mission & Vision
            </h2>
            <div className="w-20 h-1 bg-[#414141] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-[#414141] p-6 bg-white">
              <h3 className="text-lg font-medium text-[#414141] mb-3">
                Mission
              </h3>
              <p className="text-gray-600 mb-4">
                To create exceptional lace fabrics that inspire designers and
                delight consumers, while upholding the highest standards of
                quality, sustainability, and ethical business practices.
              </p>
              <p className="text-gray-600">
                We strive to preserve the artistry of traditional lace-making
                while embracing technological innovations that enhance our
                products and services, ensuring we remain at the forefront of
                the textile industry.
              </p>
            </div>

            <div className="border border-[#414141] p-6 bg-white">
              <h3 className="text-lg font-medium text-[#414141] mb-3">
                Vision
              </h3>
              <p className="text-gray-600 mb-4">
                To be globally recognized as the leading purveyor of premium
                lace fabrics, setting industry benchmarks for design excellence,
                innovation, and customer service.
              </p>
              <p className="text-gray-600">
                We envision a future where Sethani Lace is synonymous with
                elegance, craftsmanship, and sustainability, contributing to the
                cultural heritage of textile arts while meeting the evolving
                needs of the global fashion industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-[#414141] mb-4">
            Our Core Values
          </h2>
          <p className="w-3/4 m-auto text-gray-600">
            These principles guide our decisions and actions as we pursue
            excellence in everything we do.
          </p>
          <div className="w-20 h-1 bg-[#414141] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-[#414141] p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#414141] mb-3">
              Excellence
            </h3>
            <p className="text-gray-600">
              We are committed to exceeding expectations in every aspect of our
              business, from the quality of our products to the service we
              provide our clients.
            </p>
          </div>

          <div className="border border-[#414141] p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#414141] mb-3">
              Innovation
            </h3>
            <p className="text-gray-600">
              We continuously explore new techniques, designs, and technologies
              to enhance our products and processes, driving the evolution of
              lace fabric manufacturing.
            </p>
          </div>

          <div className="border border-[#414141] p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#414141] mb-3">
              Integrity
            </h3>
            <p className="text-gray-600">
              We conduct our business with transparency, honesty, and ethical
              practices, building trust with our customers, suppliers, and
              employees.
            </p>
          </div>

          <div className="border border-[#414141] p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-medium text-[#414141] mb-3">
              Sustainability
            </h3>
            <p className="text-gray-600">
              We are dedicated to environmentally responsible practices,
              minimizing our ecological footprint while maximizing the positive
              impact on communities where we operate.
            </p>
          </div>
        </div>
      </div>

      {/* Manufacturing Process */}
      <div className="bg-gray-50 py-16 px-4 sm:px-8 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium text-[#414141] mb-4">
              Our Manufacturing Excellence
            </h2>
            <div className="w-20 h-1 bg-[#414141] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="border border-[#414141]">
              <img
                src="https://images.unsplash.com/photo-1558304970-abd589baebe5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Manufacturing Process"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <p className="text-gray-600 mb-4">
                Our state-of-the-art manufacturing facility in Surat combines
                traditional craftsmanship with cutting-edge technology to
                produce lace fabrics of unparalleled quality and intricacy.
              </p>
              <p className="text-gray-600 mb-4">
                Each piece passes through rigorous quality control measures,
                ensuring that only the finest products reach our clients. Our
                master artisans bring decades of experience to their craft,
                creating intricate patterns that showcase the beauty and
                versatility of lace.
              </p>
              <p className="text-gray-600">
                From the selection of premium raw materials to the final
                inspection of finished products, we maintain exacting standards
                at every stage of the manufacturing process. This unwavering
                commitment to excellence has earned us the trust and loyalty of
                customers worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-medium text-[#414141] mb-4">
            Our Leadership
          </h2>
          <p className="w-3/4 m-auto text-gray-600">
            Meet the dedicated professionals who guide our company toward
            continued growth and success.
          </p>
          <div className="w-20 h-1 bg-[#414141] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="border border-[#414141]">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"
                alt="CEO"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-[#414141]">
                Nilesh Rachhadiya
              </h3>
              <p className="text-sm text-gray-500 mb-2">CEO</p>
              <p className="text-gray-600 text-sm">
                With extensive experience in the textile industry, Nilesh leads
                Sethani Lace with vision and integrity, driving the company's
                growth and innovation in the global market.
              </p>
            </div>
          </div>

          <div className="border border-[#414141]">
            <div className="aspect-square overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt="COO"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-[#414141]">
                Mark Rachhadiya
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Chief Operating Officer
              </p>
              <p className="text-gray-600 text-sm">
                Mark oversees the day-to-day operations of Sethani Lace,
                ensuring efficient processes while maintaining our high
                standards of quality and sustainability in all aspects of
                production.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#414141] text-white py-16 px-4 sm:px-8 text-center">
        <h2 className="text-2xl font-medium mb-4">
          Experience the Sethani Lace Difference
        </h2>
        <p className="max-w-3xl mx-auto mb-8">
          We invite you to explore our collection and discover why fashion
          houses and designers worldwide choose Sethani Lace for their
          creations.
        </p>
        <button className="px-8 py-3 bg-white text-[#414141] hover:bg-gray-100 transition-colors">
          View Our Collection
        </button>
      </div>
    </div>
  );
};

export default About;
