Start each of the blog dockers by first creating and pushing
the docker image from each root directory, then applying the 
yaml files in the infra/k8s folder.

Then in the kube-prometheus directory, do kubectl create -f manifests/ then
kubectl create -f manifests/setup, then kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090

