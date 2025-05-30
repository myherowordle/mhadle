import argparse

from check_equality import check_equality, find_minimal_identifier_fields
from fetch_info import fetch_info
from global_student_list import disable_student, generate_global_student_list
from sanitization import check_key_and_id_field, delete_saved_info

INCLUDED_FIELDS = ['school', 'role', 'damageType', 'exSkillCost', 'weaponType', 'releaseDate']

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download My Hero Academia character information and check for conflicts.")
    parser.add_argument('--no-cache', action='store_true', help='Disable cache and do a fresh fetch.')
    args = parser.parse_args()

    if args.no_cache:
        print("Deleting saved information...")
        delete_saved_info()
        print("Deleting saved information done.")
        
    print("Fetching information...")
    jp_list = fetch_info()
    print("Fetching information done.")
    print("Checking key and id field...")
    jp_list = check_key_and_id_field(jp_list)
    print("Checking key and id field done.")
    print("Generating global student list...")
    gl_list = generate_global_student_list()
    print("Generating global student list done.")
    print("Checking equality...")
    conflicts = check_equality(jp_list, INCLUDED_FIELDS)
    if conflicts:
        print(f"Conflicts: {conflicts}")
        print("Students will be disabled in both the global list and the character list.")
        for student in conflicts:
            disable_student(student)
        print("Repairing done.")
    
    print("Checking equality done.")
    print(f"Smallest identifier fields: {find_minimal_identifier_fields(gl_list)}")