import requests
import os
import whisper
from transformers import pipeline
import gdown



def download_file(url, local_filename):
    # Streaming download to handle large files
    with requests.get(url, stream=True) as r:
        r.raise_for_status()
        with open(local_filename, 'wb') as f:
            for chunk in r.iter_content(chunk_size=8192):
                f.write(chunk)
    return local_filename

def transcribe_audio(audio_path):
    model = whisper.load_model("base")
    result = model.transcribe(audio_path)
    return result['text']

def summarize_text(text):
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    max_input_length = 1024
    chunks = [text[i:i+max_input_length] for i in range(0, len(text), max_input_length)]

    summaries = []
    for chunk in chunks:
        summary = summarizer(chunk, max_length=130, min_length=30, do_sample=False)
        summaries.append(summary[0]['summary_text'])
    bullet_point_summary = "\n• ".join(summaries)
    return "• " + bullet_point_summary

def meeting_summarizer(input_type, input_data):
    if input_type == "audio":
        # Check if input_data is a URL
        if input_data.startswith("http"):
            local_file = "temp_audio.mp3"
            gdown.download(input_data, local_file, quiet=False,fuzzy=True)
            transcript = transcribe_audio(local_file)
            os.remove(local_file) 
        else:
            transcript = transcribe_audio(input_data)
        print("Transcript:\n", transcript)
    elif input_type == "text":
        transcript = input_data
        print("Transcript provided directly.")
    summary = summarize_text(transcript)
    summary_list = summary.split("\n")
    return summary_list


if __name__ == "__main__":
    print(meeting_summarizer("audio", "https://drive.google.com/file/d/1MwpVdLT-e9bDqQm4YRJg0fRoI0CXWXfc/view?usp=sharing"))
