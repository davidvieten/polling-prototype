import { FC, useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';

interface Player {
  id: string;
  name: string;
  school: string;
  position: string;
}

interface AutocompleteProps {
  placeholder: string;
  onValueChange: (value: string) => void;
}

const Autocomplete: FC<AutocompleteProps> = ({placeholder, onValueChange }) => {
  const [value, setValue] = useState('');
  const [coachSchool, setCoachSchool] = useState('');
  const [suggestions, setSuggestions] = useState<Player[]>([]);

  useEffect(() => {
    const fetchCoachInfo = async () => {
      try {
        const response = await fetch('/api/users/me');
        const coach = await response.json();
        setCoachSchool(coach.school);
      } catch (error) {
        console.error('Error fetching coach info:', error);
      }
    };
    fetchCoachInfo();
  }, []);

  const onChange = (_event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  const fetchPlayers = async (query: string) => {
    try {
      const response = await fetch(`/api/players?q=${query}`);
      const players: Player[] = await response.json();
      
      // Filter out players from the coach's school
      const filteredPlayers = players.filter(player => player.school !== coachSchool);
      
      setSuggestions(filteredPlayers);
    } catch (error) {
      console.error('Error fetching player suggestions:', error);
    }
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const inputValue = value.trim().toLowerCase();
    if (inputValue.length > 0) {
      fetchPlayers(inputValue);
    } else {
      setSuggestions([]);
    }
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: Player) => suggestion.name;

  const renderSuggestion = (suggestion: Player, { isHighlighted }: { isHighlighted: boolean }) => (
    <div className={`suggestion-item ${isHighlighted ? 'bg-black text-white' : 'bg-white text-black'} p-2`}>
      {suggestion.name} - {suggestion.school}
    </div>
  );

  const inputProps = {
    placeholder,
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
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
