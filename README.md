# Headline Quiz

![image](https://github.com/user-attachments/assets/4f34a7ac-086c-4a44-a7f6-72679be02455)
# (Demo)[https://headlinequiz.jeffrey.hackclub.app/]

## Description
Headline Quiz is an interactive web-based game designed to test your ability to distinguish between real and fake news headlines. The game presents a series of headlines, and your task is to identify which ones are real and which ones are fake.

## Features
- **Interactive Gameplay**: Click on headlines to guess if they are real or fake.
- **Timer**: Each round is timed to add an element of challenge.
- **Score Tracking**: Keep track of your points and high scores.
- **Sound Effects**: Audio feedback for correct and incorrect answers.
- **Responsive Design**: Works on both desktop and mobile devices.

## Installation
To run the Headline Quiz locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/JeffreyWangDev/headlineQuiz.git
    cd headlineQuiz
    ```

2. **Set up a virtual environment**:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. **Install the dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4. **Run the application**:
    ```sh
    python main.py
    ```

5. **Open your browser** and navigate to `http://127.0.0.1:5000` to start playing.

### Docker Installation

To run the Headline Quiz using Docker, follow these steps:

1. **Build the Docker image**:
    ```sh
    docker build -t headline-quiz .
    ```

2. **Run the Docker container**:
    ```sh
    docker run -p 5000:80 headline-quiz
    ```

3. **Open your browser** and navigate to `http://127.0.0.1:5000` to start playing.

## Usage
- **Start the Game**: Open the application in your browser and click "Enter" to start the game.
- **Guess the Headlines**: Click on the headlines to guess if they are real or fake.
- **Continue or Play Again**: After each round, you can choose to continue or start a new game.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. 

## Contact
For any questions or feedback, please open a pull request/issue 
