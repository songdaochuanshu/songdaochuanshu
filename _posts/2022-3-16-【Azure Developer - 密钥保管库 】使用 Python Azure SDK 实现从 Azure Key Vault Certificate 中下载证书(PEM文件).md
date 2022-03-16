---
layout: post
title: "【Azure Developer - 密钥保管库 】使用 Python Azure SDK 实现从 Azure Key Vault Certificate 中下载证书(PEM文件)"
date: "2022-03-16T15:18:43.088Z"
---
【Azure Developer - 密钥保管库 】使用 Python Azure SDK 实现从 Azure Key Vault Certificate 中下载证书(PEM文件)
==========================================================================================

问题描述
====

在**Azure Key Vault**中，我们可以从**Azure**门户中下载证书**PEM**文件到本地。 可以通过**OpenSSL**把**PFX**文件转换到**PEM**文件。然后用**TXT**方式查看内容，操作步骤如下图：

![](https://img2022.cnblogs.com/blog/2127802/202203/2127802-20220316213621481-1132479520.png)

**OpenSSL**转换命令为： 

openssl pkcs12 -in "C:\\Users\\Downloads\\mykeyvault01-cscert01-20220316.pfx" -nokeys -out "C:\\tool\\xd12.pem"

当然，Azure也提供了通过PowerShell或CLI命令来下载PEM文件，操作为：

**az keyvault certificate download** --vault-name vault -n cert-name \-f cert.pem

（Source : [https://docs.microsoft.com/en-us/cli/azure/keyvault/certificate?view=azure-cli-latest#az-keyvault-certificate-download](https://docs.microsoft.com/en-us/cli/azure/keyvault/certificate?view=azure-cli-latest#az-keyvault-certificate-download))

 那么，如何可以通过Python SDK的代码获取到PEM文件呢？

问题解答
====

查看 Python SDK Certificate中公布出来的接口，并没有 Export， Download 的方法。 **Python Azure Key Vault SDK 中并没有可以直接下载PEM文件的方法。**

**Azure SDK For Python KeyVault -- CertificateClient Class ：** [https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#methods](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#methods)

Methods
-------

[backup\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-backup-certificate)

Back up a certificate in a protected form useable only by Azure Key Vault.

Requires certificates/backup permission. This is intended to allow copying a certificate from one vault to another. Both vaults must be owned by the same Azure subscription. Also, backup / restore cannot be performed across geopolitical boundaries. For example, a backup from a vault in a USA region cannot be restored to a vault in an EU region.

[cancel\_certificate\_operation](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-cancel-certificate-operation)

Cancels an in-progress certificate operation. Requires the certificates/update permission.

[create\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-create-certificate)

Creates a new certificate.

If this is the first version, the certificate resource is created. This operation requires the certificates/create permission. The poller requires the certificates/get permission, otherwise raises an [HttpResponseError](https://docs.microsoft.com/en-us/python/api/azure-core/azure.core.exceptions.httpresponseerror?view=azure-python)

[create\_issuer](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-create-issuer)

Sets the specified certificate issuer. Requires certificates/setissuers permission.

[delete\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-delete-certificate)

Delete all versions of a certificate. Requires certificates/delete permission.

If the vault has soft-delete enabled, deletion may take several seconds to complete.

[delete\_certificate\_operation](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-delete-certificate-operation)

Deletes and stops the creation operation for a specific certificate.

Requires the certificates/update permission.

[delete\_contacts](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-delete-contacts)

Deletes the certificate contacts for the key vault. Requires the certificates/managecontacts permission.

[delete\_issuer](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-delete-issuer)

Deletes the specified certificate issuer.

Requires certificates/manageissuers/deleteissuers permission.

[get\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-certificate)

Gets a certificate with its management policy attached. Requires certificates/get permission.

Does not accept the version of the certificate as a parameter. To get a specific version of the certificate, call [get\_certificate\_version](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-certificate-version).

[get\_certificate\_operation](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-certificate-operation)

Gets the creation operation of a certificate. Requires the certificates/get permission.

[get\_certificate\_policy](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-certificate-policy)

Gets the policy for a certificate. Requires certificates/get permission.

Returns the specified certificate policy resources in the key vault.

[get\_certificate\_version](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-certificate-version)

Gets a specific version of a certificate without returning its management policy.

Requires certificates/get permission. To get the latest version of the certificate, or to get the certificate's policy as well, call [get\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-certificate).

[get\_contacts](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-contacts)

Gets the certificate contacts for the key vault. Requires the certificates/managecontacts permission.

[get\_deleted\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-deleted-certificate)

Get a deleted certificate. Possible only in a vault with soft-delete enabled.

Requires certificates/get permission. Retrieves the deleted certificate information plus its attributes, such as retention interval, scheduled permanent deletion, and the current deletion recovery level.

[get\_issuer](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-get-issuer)

Gets the specified certificate issuer. Requires certificates/manageissuers/getissuers permission.

[import\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-import-certificate)

Import a certificate created externally. Requires certificates/import permission.

Imports an existing valid certificate, containing a private key, into Azure Key Vault. The certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM format the PEM file must contain the key as well as x509 certificates, and you must provide a `policy` with [content\_type](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.certificatepolicy?view=azure-python#azure-keyvault-certificates-certificatepolicy-content-type) of [pem](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.certificatecontenttype?view=azure-python#azure-keyvault-certificates-certificatecontenttype-pem).

[list\_deleted\_certificates](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-list-deleted-certificates)

Lists the currently-recoverable deleted certificates. Possible only if vault is soft-delete enabled.

Requires certificates/get/list permission. Retrieves the certificates in the current vault which are in a deleted state and ready for recovery or purging. This operation includes deletion-specific information.

[list\_properties\_of\_certificate\_versions](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-list-properties-of-certificate-versions)

List the identifiers and properties of a certificate's versions.

Requires certificates/list permission.

[list\_properties\_of\_certificates](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-list-properties-of-certificates)

List identifiers and properties of all certificates in the vault.

Requires certificates/list permission.

[list\_properties\_of\_issuers](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-list-properties-of-issuers)

Lists properties of the certificate issuers for the key vault.

Requires the certificates/manageissuers/getissuers permission.

[merge\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-merge-certificate)

Merges a certificate or a certificate chain with a key pair existing on the server.

Requires the certificates/create permission. Performs the merging of a certificate or certificate chain with a key pair currently available in the service. Make sure when creating the certificate to merge using [create\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-create-certificate) that you set its issuer to 'Unknown'. This way Key Vault knows that the certificate will not be signed by an issuer known to it.

[purge\_deleted\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-purge-deleted-certificate)

Permanently deletes a deleted certificate. Possible only in vaults with soft-delete enabled.

Requires certificates/purge permission.

Performs an irreversible deletion of the specified certificate, without possibility for recovery. The operation is not available if the [recovery\_level](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.certificateproperties?view=azure-python#azure-keyvault-certificates-certificateproperties-recovery-level) does not specify 'Purgeable'. This method is only necessary for purging a certificate before its [scheduled\_purge\_date](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.deletedcertificate?view=azure-python#azure-keyvault-certificates-deletedcertificate-scheduled-purge-date).

[recover\_deleted\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-recover-deleted-certificate)

Recover a deleted certificate to its latest version. Possible only in a vault with soft-delete enabled.

Requires certificates/recover permission. If the vault does not have soft-delete enabled, [delete\_certificate](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-delete-certificate) is permanent, and this method will raise an error. Attempting to recover a non-deleted certificate will also raise an error.

[restore\_certificate\_backup](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-restore-certificate-backup)

Restore a certificate backup to the vault. Requires certificates/restore permission.

This restores all versions of the certificate, with its name, attributes, and access control policies. If the certificate's name is already in use, restoring it will fail. Also, the target vault must be owned by the same Microsoft Azure subscription as the source vault.

[set\_contacts](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-set-contacts)

Sets the certificate contacts for the key vault. Requires certificates/managecontacts permission.

[update\_certificate\_policy](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-update-certificate-policy)

Updates the policy for a certificate. Requires certificiates/update permission.

Set specified members in the certificate policy. Leaves others as null.

[update\_certificate\_properties](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-update-certificate-properties)

Change a certificate's properties. Requires certificates/update permission.

[update\_issuer](https://docs.microsoft.com/en-us/python/api/azure-keyvault-certificates/azure.keyvault.certificates.aio.certificateclient?view=azure-python#azure-keyvault-certificates-aio-certificateclient-update-issuer)

Updates the specified certificate issuer. Requires certificates/setissuers permission.

**所以使用原始的SDK Methods方法不可行。**

寻找解决方案
------

通过对CLI （az keyvault certificate download）指令的研究，发现CLI使用的是python代码执行的Get Certificates 操作，实质上是调用的Key Vault的**REST API:** 

**Get Certificate：** [https://docs.microsoft.com/en-us/rest/api/keyvault/certificates/get-certificate/get-certificate#getcertificate](https://docs.microsoft.com/en-us/rest/api/keyvault/certificates/get-certificate/get-certificate#getcertificate)

![](https://img2022.cnblogs.com/blog/2127802/202203/2127802-20220316220035376-1897131492.png)

 **DEBUG az 指令：**

az keyvault certificate download --vault-name mykeyvault01 -n cscert01 \-f cert2.pem  \--debug

C:\\Users>az keyvault certificate download --vault-name mykeyvault01 -n cscert01 \-f cert2.pem  --debug
cli.knack.cli: Command arguments: \['keyvault', 'certificate', 'download', '\--vault-name', 'mykeyvault01', '-n', 'cscert01', '\-f', 'cert2.pem', '--debug'\]
cli.knack.cli: \_\_init\_\_ debug log:
Enable color in terminal.
Init colorama.
cli.knack.cli: Event: Cli.PreExecute \[\]
cli.knack.cli: Event: CommandParser.OnGlobalArgumentsCreate \[<function CLILogging.on\_global\_arguments at 0x033452F8>, <function OutputProducer.on\_global\_arguments at 0x034F0190>, <function CLIQuery.on\_global\_arguments at 0x03607D60>\]
cli.knack.cli: Event: CommandInvoker.OnPreCommandTableCreate \[\]
cli.azure.cli.core: Modules found from index for 'keyvault': \['azure.cli.command\_modules.keyvault'\]
cli.azure.cli.core: Loading command modules:
cli.azure.cli.core: Name                  Load Time    Groups  Commands
cli.azure.cli.core: keyvault                  0.038        19       117
cli.azure.cli.core: Total (1)                 0.038        19       117
cli.azure.cli.core: These extensions are not installed and will be skipped: \['azext\_ai\_examples', 'azext\_next'\]
cli.azure.cli.core: Loading extensions:
cli.azure.cli.core: Name                  Load Time    Groups  Commands  Directory
cli.azure.cli.core: Total (0)                 0.000         0         0
cli.azure.cli.core: Loaded 19 groups, 117 commands.
cli.azure.cli.core: Found a match in the command table.
cli.azure.cli.core: Raw command  : keyvault certificate download
cli.azure.cli.core: Command table: keyvault certificate download
cli.knack.cli: Event: CommandInvoker.OnPreCommandTableTruncate \[<function AzCliLogging.init\_command\_file\_logging at 0x039701D8>\]
cli.azure.cli.core.azlogging: metadata file logging enabled \- writing logs to 'C:\\Users\\.azure\\commands\\2022-03-16.14-46-58.keyvault\_certificate\_download.21860.log'.
az\_command\_data\_logger: command args: keyvault certificate download \--vault-name {} -n {} \-f {} --debug
cli.knack.cli: Event: CommandInvoker.OnPreArgumentLoad \[<function register\_global\_subscription\_argument.<locals>.add\_subscription\_parameter at 0x039B6268>, <function register\_global\_query\_examples\_argument.<locals>.register\_query\_examples at 0x039D8928>\]
cli.knack.cli: Event: CommandInvoker.OnPostArgumentLoad \[\]
cli.knack.cli: Event: CommandInvoker.OnPostCommandTableCreate \[<function register\_ids\_argument.<locals>.add\_ids\_arguments at 0x039D8970>, <function register\_cache\_arguments.<locals>.add\_cache\_arguments at 0x039D8A00>\]
cli.knack.cli: Event: CommandInvoker.OnCommandTableLoaded \[\]
cli.knack.cli: Event: CommandInvoker.OnPreParseArgs \[\]
cli.knack.cli: Event: CommandInvoker.OnPostParseArgs \[<function OutputProducer.handle\_output\_argument at 0x034F01D8>, <function CLIQuery.handle\_query\_parameter at 0x03607DA8>, <function register\_global\_query\_examples\_argument.<locals>.handle\_example\_parameter at 0x039D88E0>, <function register\_ids\_argument.<locals>.parse\_ids\_arguments at 0x039D89B8>\]
msrest.universal\_http.requests: Configuring retry: max\_retries\=4, backoff\_factor=0.8, max\_backoff=90
msrest.service\_client: Accept header absent and forced to application/json
msrest.universal\_http: Configuring redirects: allow\=True, max=30
msrest.universal\_http: Configuring request: timeout\=100, verify=True, cert=None
msrest.universal\_http: Configuring proxies: ''
msrest.universal\_http: Evaluate proxies against ENV settings: True
urllib3.connectionpool: Starting new HTTPS connection (1): mykeyvault01.vault.azure.cn:443
urllib3.connectionpool: https://mykeyvault01.vault.azure.cn:443 "GET /certificates/cscert01/?api-version=7.0 HTTP/1.1" 401 97
cli.azure.cli.core.\_profile: Profile.get\_raw\_token invoked with resource\='https://vault.azure.cn', subscription=None, tenant=None
cli.azure.cli.core.util: attempting to read file C:\\Users\\.azure\\accessTokens.json as utf\-8-sig
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - Authority:Performing instance discovery: ...
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - Authority:Performing static instance discovery
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - Authority:Authority validated via static instance discovery
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - TokenRequest:Getting token from cache with refresh if necessary.
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - CacheDriver:finding with query keys: {'\_clientId': '...', 'userId': '...'}
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - CacheDriver:Looking for potential cache entries: {'\_clientId': '...', 'userId': '...'}
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - CacheDriver:Found 9 potential entries.
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - CacheDriver:Resource specific token found.
adal\-python: 3f4f9351-cdc1-4891-b125-1f02ac02741b - CacheDriver:Returning token from cache lookup, AccessTokenId: b'wR5KoJYE=', RefreshTokenId: b'5VNpWgDCg4ydvuf2PeWxGaph/r7KMelGLXVY+jLV89s='
urllib3.connectionpool: https://mykeyvault01.vault.azure.cn:443 "GET /certificates/cscert01/?api-version=7.0 HTTP/1.1" 200 2114
cli.knack.cli: Event: CommandInvoker.OnTransformResult \[<function \_resource\_group\_transform at 0x039A5C88>, <function \_x509\_from\_base64\_to\_hex\_transform at 0x039A5CD0>\]
cli.knack.cli: Event: CommandInvoker.OnFilterResult \[\]
cli.knack.cli: Event: Cli.SuccessfulExecute \[\]
cli.knack.cli: Event: Cli.PostExecute \[<function AzCliLogging.deinit\_cmd\_metadata\_logging at 0x039702F8>\]
az\_command\_data\_logger: exit code: 0
cli.\_\_main\_\_: Command ran in 3.206 seconds (init: 0.394, invoke: 2.812)
telemetry.save: Save telemetry record of length 3005 in cache
telemetry.check: Negative: The C:\\Users\\.azure\\telemetry.txt was modified at 2022-03-16 14:43:00.945931, which in less than 600.000000 s

如以上**黄色高亮**内容， download指令调用了 "GET /certificates/cscert01/?api-version=7.0 HTTP/1.1" 200 2114，且返回的HTTP Code为200 成功。所以当我们单独对get certificates接口请求时，在返回结果中，发现cer属性值就是证书PEM格式内容。通过Postman发送请求并验证结果：

![](https://img2022.cnblogs.com/blog/2127802/202203/2127802-20220316220200554-1943306669.png)

那么，通过Python Azure SDK的 certificate\_client.get\_certificate方法，获取到certificate对象后，其中包含的cer值，是否也是PEM的内容呢？ 

我们通过下面的代码来进行验证：

from azure.identity import DefaultAzureCredential
from azure.keyvault.certificates import CertificateClient
import ssl

credential \= DefaultAzureCredential()

certificate\_client \= CertificateClient(vault\_url=https://yourkeyvaultname.vault.azure.cn/, credential=credential)

certificate \= certificate\_client.get\_certificate("your certificate name")

print(certificate.name)
print(certificate.properties.version)
print(certificate.policy.issuer\_name)
print(str(certificate.cer))

# Convert the certificate to PEM format        
cert\_PEM = ssl.DER\_cert\_to\_PEM\_cert(certificate.cer);
print("Certificate in PEM format:");
print(cert\_PEM);

是的，在certificate对象中，cer就是我们证书的内容，但是由于格式为DER，所以使用了SSL包中的 DER\_cert\_to\_PEM\_cert 方法完成转换，最终得到PEM文件内容。 

![](https://img2022.cnblogs.com/blog/2127802/202203/2127802-20220316221605586-196217597.png)

在 python代码中获取到PEM内容后，剩下的部分就是把内容输出到 .pem 文件即可。

##接上一段代码
filename \= 'mypem1.pem'
# Open the file in append mode and append the new content in file\_object
with open(filename, 'a') as file\_object:
    file\_object.write(cert\_PEM)

print("output the PEM file End!")

注意：在创建 certificate\_client对象时，需要使用credential，而以上代码使用的是默认的DefaultAzureCredential()，在执行代码的本机中，已经配置了如下环境变量：

*   AZURE\_TENANT\_ID
*   AZURE\_CLIENT\_ID
*   AZURE\_CLIENT\_SECRET

使用 **ClientSecretCredential** 认证方式后，代码修改如下：

import os
from azure.keyvault.certificates import CertificateClient
import ssl
from azure.identity import ClientSecretCredential
from msrestazure.azure\_cloud import AZURE\_CHINA\_CLOUD

print('AZURE\_TENANT\_ID:' +os.environ\["AZURE\_TENANT\_ID"\])
print('AZURE\_CLIENT\_ID:' +os.environ\["AZURE\_CLIENT\_ID"\])
print('AZURE\_CLIENT\_SECRET:' +os.environ\["AZURE\_CLIENT\_SECRET"\])

credential \= ClientSecretCredential (client\_id=os.environ\["AZURE\_CLIENT\_ID"\],client\_secret=os.environ\["AZURE\_CLIENT\_SECRET"\],tenant\_id=os.environ\["AZURE\_TENANT\_ID"\],cloud\_environment=AZURE\_CHINA\_CLOUD,china=True)
certificate\_client \= CertificateClient(vault\_url="https://yourkeyvault.vault.azure.cn/", credential=credential)

certificate \= certificate\_client.get\_certificate("your certificate name")

print(certificate.name)
print(certificate.properties.version)
print(certificate.policy.issuer\_name)
print(str(certificate.cer))

# Convert the certificate to PEM format        
cert\_PEM = ssl.DER\_cert\_to\_PEM\_cert(certificate.cer);
print("Certificate in PEM format:");
print(cert\_PEM);

filename \= 'mypem2.pem'
# Open the file in append mode and append the new content in file\_object
with open(filename, 'a') as file\_object:
    file\_object.write(cert\_PEM)

print("output the PEM file End!")

### 参考文档

Retrieve a Certificate：[https://docs.microsoft.com/en-us/python/api/overview/azure/keyvault-certificates-readme?view=azure-python#retrieve-a-certificate](https://docs.microsoft.com/en-us/python/api/overview/azure/keyvault-certificates-readme?view=azure-python#retrieve-a-certificate)  
Der\_cert\_to\_pem\_cert Function Of Ssl Module In Python： [https://pythontic.com/ssl/ssl-module/der\_cert\_to\_pem\_cert](https://pythontic.com/ssl/ssl-module/der_cert_to_pem_cert)  
A certificate bundle consists of a certificate (X509) plus its attributes: [https://docs.microsoft.com/en-us/rest/api/keyvault/certificates/get-certificate/get-certificate#certificatebundle](https://docs.microsoft.com/en-us/rest/api/keyvault/certificates/get-certificate/get-certificate#certificatebundle)

当在复杂的环境中面临问题，格物之道需：浊而静之徐清，安以动之徐生。 云中，恰是如此!