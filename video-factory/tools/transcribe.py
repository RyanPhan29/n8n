#!/usr/bin/env python3
import whisper, json, sys, time
t0=time.time()
model = whisper.load_model("small")
print("model loaded", round(time.time()-t0,1), flush=True)
res = model.transcribe(
    "/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad/clean.wav",
    language="vi", word_timestamps=True, verbose=False,
    condition_on_previous_text=False,
)
words=[]
for seg in res["segments"]:
    for w in seg.get("words",[]):
        words.append({"w":w["word"].strip(),"s":round(w["start"],3),"e":round(w["end"],3)})
json.dump({"words":words,"text":res["text"]}, open("/tmp/claude-0/-home-user-n8n/9ed80c3f-0197-53dc-95c7-0baab5a1694e/scratchpad/whisper_words.json","w"), ensure_ascii=False)
print("words:", len(words), "elapsed", round(time.time()-t0,1), flush=True)
