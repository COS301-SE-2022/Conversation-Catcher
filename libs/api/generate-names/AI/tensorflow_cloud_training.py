import tensorflow_cloud as tfc

tfc.run(entry_point="train_name_generation.py",
    requirements_txt="requirements.txt")

#    distribution_strategy="auto",
#    chief_config=tfc.MachineConfig(
#        cpu_cores=2,
#        memory=13,
#        accelerator_type=tfc.AcceleratorType.NO_ACCELERATOR,
#        accelerator_count=0,
#    ),
#    docker_image_bucket_name="convbucket")
