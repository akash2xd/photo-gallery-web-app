/**
 * PhotoCard component renders an individual photo card with image,
 * author name, and a favourite toggle button.
 *
 * Props:
 *   photo     - photo object from the Picsum API
 *   isFavourite - boolean indicating if this photo is favourited
 *   onToggleFavourite - callback to toggle favourite status
 */
export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  // Build a reasonably sized image URL from Picsum
  // Using 400x300 for consistent card dimensions
  const imageUrl = `https://picsum.photos/id/${photo.id}/400/300`;

  return (
    <article className="bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md">
      {/* Photo */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Card footer with author name and favourite button */}
      <div className="px-4 py-3 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-700 truncate pr-2">
          {photo.author}
        </p>

        <button
          onClick={() => onToggleFavourite(photo.id)}
          aria-label={isFavourite ? `Remove ${photo.author} from favourites` : `Add ${photo.author} to favourites`}
          className="flex-shrink-0 p-1 rounded-full transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          {isFavourite ? (
            /* Filled heart */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-rose-500"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          ) : (
            /* Outline heart */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400 hover:text-rose-400"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 5.002A5.741 5.741 0 0016.313 3c-1.6 0-3.088.674-4.313 1.952C10.775 3.674 9.287 3 7.688 3a5.741 5.741 0 00-5.44 2.002C.533 7.564 1.238 11.28 4.74 14.87a25.79 25.79 0 004.862 3.718l.162.094a1.5 1.5 0 001.472 0l.162-.094a25.79 25.79 0 004.862-3.718c3.502-3.59 4.207-7.306 2.492-9.868z"
              />
            </svg>
          )}
        </button>
      </div>
    </article>
  );
}
