import { useState } from "react";
import OpenAI from 'openai';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField } from '@mui/material';

const client = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const CharacterImage = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [race, setRace] = useState('human');
    const [sex, setSex] = useState('female');
    const [style, setStyle] = useState('cartoon');
    const [age, setAge] = useState(20);

    const generateImage = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await client.images.generate({
                model: "dall-e-3",
                prompt: `a ${style} style full-body drawing of a ${sex} ${race} who looks to be the age of ${age}`,
                size: "1024x1024",
                quality: "standard",
                n: 1,
            });

            setImageUrl(response.data[0].url);
        } catch (error) {
            console.error("Error generating image:", error);
            setError('Failed to generate image');
        } finally {
            setIsLoading(false);
        }
    };

    const setCharacterRace = (e) => {
        setRace(e.target.value)
    }

    const setCharacterSex = (e) => {
        setSex(e.target.value)
    }

    const setCharacterStyle = (e) => {
        setStyle(e.target.value)
    }

    const setCharacterAge = (e) => {
        setAge(e.target.value)
    }

    return (
        <Box>
            <Box>
                <Box>
                    <FormControl>
                        <FormLabel id="character-sex-buttons">Sex</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="character-sex-buttons-group-label"
                            name="character-sex-buttons-group"
                            onChange={setCharacterSex}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="character-race-buttons">Race</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="character-race-buttons-group-label"
                            name="character-race-buttons-group"
                            onChange={setCharacterRace}
                        >
                            <FormControlLabel value="elf" control={<Radio />} label="Elf" />
                            <FormControlLabel value="dwarf" control={<Radio />} label="Dwarf" />
                            <FormControlLabel value="tiefling" control={<Radio />} label="Tiefling" />
                            <FormControlLabel value="human" control={<Radio />} label="Human" />
                            <FormControlLabel value="gnome" control={<Radio />} label="Gnome" />
                            <FormControlLabel value="halfling" control={<Radio />} label="Halfling" />
                            <FormControlLabel value="dragonborn" control={<Radio />} label="Dragonborn" />
                            <FormControlLabel value="halforc" control={<Radio />} label="Half-orc" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="character-style-buttons">Style</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="character-style-buttons-group-label"
                            name="character-style-buttons-group"
                            onChange={setCharacterStyle}
                        >
                            <FormControlLabel value="cartoon" control={<Radio />} label="Cartoon" />
                            <FormControlLabel value="realistic" control={<Radio />} label="Realistic" />
                            <FormControlLabel value="sketch" control={<Radio />} label="Sketch" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box>
                    <TextField id="character-age" label="Age" inputProps={{ min: 1 }} onKeyDown={(event) => {
                        if (event?.key === '-' || event?.key === '+') {
                            event.preventDefault();
                        }
                    }} size="small" variant="outlined" type="number" onChange={setCharacterAge} />
                </Box>
            </Box>
            <button onClick={generateImage} disabled={isLoading}>
                Generate Image
            </button>
            {isLoading && <p>Generating image...</p>}
            {error && <p>{error}</p>}
            {imageUrl && <img src={imageUrl} alt="Generated character image" />}
        </Box>
    );
}

export default CharacterImage;