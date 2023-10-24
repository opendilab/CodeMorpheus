import os.path
import time
import uuid

import pandas as pd
from filelock import FileLock


class Analysis:
    def __init__(self, workdir: str = 'analysis_dir'):
        self.workdir = workdir
        if not os.path.exists(workdir):
            os.mkdir(workdir)
        self._file_lock = FileLock(os.path.join(self.workdir, '.filelock'))

    @property
    def _records_csv_file(self):
        return os.path.join(self.workdir, 'records.csv')

    def _get_records_df(self) -> pd.DataFrame:
        return pd.read_csv(self._records_csv_file)

    def _get_records(self):
        if os.path.exists(self._records_csv_file):
            return self._get_records_df().to_dict('records')
        else:
            return []

    @property
    def visit_count(self):
        with self._file_lock:
            if os.path.exists(self._records_csv_file):
                return len(self._get_records_df())
            else:
                return 0

    def save(self):
        with self._file_lock:
            uuid_ = str(uuid.uuid4())
            df = pd.DataFrame([
                *self._get_records(),
                {'code_id': uuid_, 'timestamp': time.time()}
            ])

            df.to_csv(self._records_csv_file, index=False)
