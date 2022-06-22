kind create cluster --name monitoring --image kindest/node:v1.23.1 --config kind.yaml

skaffold dev 

then follow instructions in kube-config readme skipping the create cluster step
if cpu usage is too high, increase resources alloted to Docker in docker settings or 
delete some of the workers in the kind yaml