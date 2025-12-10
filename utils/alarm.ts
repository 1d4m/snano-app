let audioCtx: AudioContext | null = null;
let loopSource: AudioBufferSourceNode | null = null;
let alarmBuffer: AudioBuffer | null = null;

async function loadAlarm() {
  if (!audioCtx) audioCtx = new AudioContext();
  if (alarmBuffer) return alarmBuffer;

  const resp = await fetch("/alarm.wav");
  const arr = await resp.arrayBuffer();
  alarmBuffer = await audioCtx.decodeAudioData(arr);

  return alarmBuffer;
}

export async function playAlarmLoop() {
  if (!audioCtx) audioCtx = new AudioContext();

  // 事前にロードしておく
  const buf = await loadAlarm();

  // 古いの止める
  if (loopSource) loopSource.stop();

  // 新しい source を作成
  loopSource = audioCtx.createBufferSource();
  loopSource.buffer = buf;
  loopSource.loop = true;
  loopSource.connect(audioCtx.destination);

  // “ほぼ即時”で鳴る
  loopSource.start(audioCtx.currentTime);
}

export function stopAlarmLoop() {
  if (loopSource) {
    loopSource.stop();
    loopSource = null;
  }
}
