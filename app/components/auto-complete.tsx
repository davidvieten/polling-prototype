import { FC, useState } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutocompleteProps {
  suggestions: string[];
  placeholder: string;
  onValueChange: (value: string) => void;
}

interface ChangeEvent {
  newValue: string;
  method: string;
}

const Autocomplete: FC<AutocompleteProps> = ({ suggestions, placeholder, onValueChange }) => {
  const [value, setValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const onChange = (_event: React.FormEvent<HTMLElement>, { newValue }: ChangeEvent) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    setFilteredSuggestions(
      inputLength === 0 ? [] : suggestions.filter(
        suggestion => suggestion.toLowerCase().includes(inputValue)
      )
    );
  };

  const onSuggestionsClearRequested = () => {
    setFilteredSuggestions([]);
  };

  const getSuggestionValue = (suggestion: string) => suggestion;

  const renderSuggestion = (suggestion: string, { isHighlighted }: { isHighlighted: boolean }) => (
    <div className={`suggestion-item ${isHighlighted ? 'bg-black text-white' : 'bg-white text-black'} p-2`}>
      {suggestion}
    </div>
  );

  const inputProps = {
    placeholder,
    value,
    onChange
  };

  return (
    <Autosuggest
      suggestions={filteredSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        suggestionsContainer: 'absolute z-10 bg-white w-full shadow-lg', 
        suggestionHighlighted: 'bg-blue-600 text-white',
      }}
    />
  );
};

export default Autocomplete;
