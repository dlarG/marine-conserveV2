import sqlite3
import os

DATABASE_PATH = os.path.join(os.path.dirname(__file__), 'donations.db')

def reset_all_limits():
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM donation_attempts')
    conn.commit()
    conn.close()
    print("✅ All rate limits reset!")

if __name__ == '__main__':
    reset_all_limits()