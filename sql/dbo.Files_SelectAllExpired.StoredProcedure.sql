/*******************TEST CODE*******************

EXECUTE [dbo].[Files_SelectAllExpired]


***********************************************/
CREATE PROC [dbo].[Files_SelectAllExpired]
AS

BEGIN

	DECLARE @Deleted bit = 1;
	DECLARE @datNow datetime2 = DATEADD(month, -4, getutcdate())

	SELECT [F].[Id]
		  ,[IsDeleted]
		  ,DateCreated

	  FROM [dbo].[Files] as F 
	  WHERE (isDeleted = @Deleted) and (DateCreated < (@datNow))

	  ORDER BY F.Id

END
GO
