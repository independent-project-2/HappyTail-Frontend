import ImageUpload from '../components/ImageUpload'

function AddPets() {
  return (
    <div className="min-h-screen bg-gray-50 overflow-auto">
      <div className="p-4 md:p-10 pt-16 md:pt-20 flex flex-col text-black justify-center items-center">
        {/* Page Header */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl md:text-3xl font-bold">Add Your Pets</h1>
          <div className="text-lg md:text-xl text-center text-gray-700">
            Help your pet find the perfect new home
          </div>
        </div>

        <form
          action=""
          className="flex flex-col lg:flex-row pt-5 gap-6 w-full max-w-6xl"
        >
          {/* left - Basic Information */}
          <div className="flex flex-col gap-4 p-6 border-2 border-gray-200 rounded-xl shadow-lg w-full lg:w-1/2 bg-white">
            <h2 className="text-xl md:text-2xl font-bold text-black-700 mb-2">
              Basic Information
            </h2>

            {/* Pet Name & Type */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex flex-col w-full">
                <label htmlFor="pet-name" className="text-gray-700 font-medium">
                  Pet Name
                </label>
                <input
                  type="text"
                  id="pet-name"
                  name="pet-name"
                  placeholder="Enter pet name"
                  className="peer w-full border-2 border-gray-300 rounded-md p-3 text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="pet-type" className="text-gray-700 font-medium">
                  Pet Type
                </label>
                <input
                  type="text"
                  id="pet-type"
                  name="pet-type"
                  placeholder="Dog, Cat, etc."
                  className="peer w-full border-2 border-gray-300 rounded-md p-3 text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                />
              </div>
            </div>

            {/* Breed & Age */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex flex-col w-full">
                <label htmlFor="breed" className="text-gray-700 font-medium">
                  Breed
                </label>
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  placeholder="Enter breed"
                  className="peer w-full border-2 border-gray-300 rounded-md p-3 text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="age" className="text-gray-700 font-medium">
                  Age (Years)
                </label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  placeholder="Enter age"
                  className="peer w-full border-2 border-gray-300 rounded-md p-3 text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-gray-700 font-medium">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write something about your pet"
                className="border-2 border-gray-300 rounded-md p-3 h-28 md:h-36 w-full text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
              ></textarea>
            </div>

            {/* Location & Price */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="flex flex-col w-full">
                <label htmlFor="location" className="text-gray-700 font-medium">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Enter location"
                  className="peer w-full border-2 border-gray-300 rounded-md p-3 text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="price" className="text-gray-700 font-medium">
                  Price (Leave blank for Free)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="$"
                  className="peer w-full border-2 border-gray-300 rounded-md p-3 text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Right- Upload & Health */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            {/* Upload Images */}
            <div className="flex flex-col items-center gap-3 p-6 border-2 border-gray-200 rounded-xl shadow-lg bg-white">
              <h2 className="text-xl md:text-2xl font-bold text-black-700">
                Upload Images
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 justify-center">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className="flex flex-col items-center gap-1 justify-center"
                  >
                    <ImageUpload />
                    <label className="text-gray-600">Image {num}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Information */}
            <div className="flex flex-col gap-3 p-6 border-2 border-gray-200 rounded-xl shadow-lg bg-white">
              <h2 className="text-xl md:text-2xl font-bold text-black-700 text-center mb-2">
                Health Information
              </h2>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="vaccinated"
                    className="accent-purple-500 hover:accent-purple-700"
                  />
                  <label htmlFor="vaccinated">Vaccinated</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="neutered"
                    className="accent-purple-500 hover:accent-purple-700"
                  />
                  <label htmlFor="neutered">Neutered/Spayed</label>
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="health-notes" className="text-gray-700 font-medium">
                  Additional Health Notes
                </label>
                <textarea
                  id="health-notes"
                  placeholder="Add any additional health information"
                  className="border-2 border-gray-300 rounded-md p-3 h-24 md:h-32 w-full text-gray-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 outline-none transition-all"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-purple-500 text-white text-lg md:text-2xl font-bold px-6 py-3 rounded-lg w-full shadow-lg hover:bg-purple-700 transition-all"
            >
              Add Pet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPets
