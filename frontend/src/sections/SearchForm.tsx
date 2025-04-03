const SearchForm: React.FC = () => {
    return (
      <div className="search-form">
        <form>
          <div className="input-group">
            <input type="text" placeholder="Job Title" className="input-field" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Location" className="input-field" />
          </div>
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
    );
  };
  
  export default SearchForm;
  