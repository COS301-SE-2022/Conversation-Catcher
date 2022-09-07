import argparse
import numpy as np
import shlex
import subprocess
import sys
import wave
import json

from deepspeech import Model, version
from timeit import default_timer as timer

class speechToText:

    def stt(self, audio_path):
        deepspeech_cmd = 'deepspeech --model deepspeech-0.9.3-models.pbmm --scorer deepspeech-0.9.3-models.scorer --audio \"{}\"'.format(audio_path)
        try:
            output = subprocess.check_output(shlex.split(deepspeech_cmd), stderr=subprocess.PIPE)
        except subprocess.CalledProcessError as e:
            raise RuntimeError('SoX returned non-zero status: {}'.format(e.stderr))
        except OSError as e:
            raise OSError(e.errno, 'SoX not found, use hz files or install it: {}'.format(e.strerror))

        return output
