# SmartShop AI - ML Service

Python-based machine learning service for product recommendations and AI chatbot.

## Features

- 🎯 Collaborative Filtering Recommendations
- 🤖 OpenAI GPT-4 Chatbot Integration
- 📊 User Preference Learning
- 💾 Model Persistence
- 🔄 Real-time Inference

## Tech Stack

- Python 3.9+
- FastAPI
- Scikit-learn
- Pandas & NumPy
- OpenAI API
- LangChain

## Installation

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Running

```bash
python main.py
```

Server will run on `http://localhost:5000`

## API Endpoints

### Recommendations
- `POST /api/recommendations/get-recommendations` - Get product recommendations
- `POST /api/recommendations/train` - Train recommendation model

### Chatbot
- `POST /api/chatbot/message` - Send message to chatbot
- `POST /api/chatbot/train` - Train chatbot intents

## Environment Variables

```bash
OPENAI_API_KEY=sk-your-key
PYTHON_ENV=development
PORT=5000
```

## Project Structure

```
ml-service/
├── app/
│   ├── recommendations/     # Recommendation engine
│   ├── chatbot/            # Chatbot logic
│   ├── models/             # ML models
│   └── utils/              # Helper functions
├── data/                   # Training data
├── models/                 # Trained models (pickle)
└── main.py                 # Entry point
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md)

## License

MIT
