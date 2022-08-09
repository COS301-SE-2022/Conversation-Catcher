import argparse
import numpy as np
import shlex
import subprocess
import sys
import wave
import json

from deepspeech import Model, version
from timeit import default_timer as timer