export const Input = ({ label, type, id, placeholder, value, onChange }) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="text-sm block text-gray-300 font-medium"
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        name={id}
        className="bg-transparent focus:outline-none focus:ring border border-gray-700 w-full px-3 py-2 mt-1 text-white rounded-md"
      />
    </div>
  );
};
