import logging
import boto3
import botocore
from botocore.exceptions import ClientError
import os
import datetime
from werkzeug.utils import secure_filename

def public_file_upload(file, bucket):
    """Upload a file to an S3 bucket and return file url
    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :return: url of new file
    """
    file_name = 'app/tmp/' + secure_filename(file.filename)

    file.save(file_name)
    
    object_name = str(int(datetime.datetime.now().timestamp())) + os.path.basename(file_name)

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        s3_client.upload_file(
            file_name,
            bucket,
            object_name,
            ExtraArgs={'ACL': 'public-read'}
            )

        # get public url of newly created obj
        config = botocore.client.Config(signature_version=botocore.UNSIGNED)

        object_url = boto3.client('s3', config=config).generate_presigned_url('get_object', ExpiresIn=0, Params={'Bucket': bucket, 'Key': object_name})

        return object_url
    except ClientError as e:
        logging.error(e)
        return False
